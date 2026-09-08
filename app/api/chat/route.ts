import { createAnthropic } from "@ai-sdk/anthropic";
import { APICallError, streamText } from "ai";
import { buildSystemPrompt } from "@/content/persona";
import type { Locale } from "@/content/types";
import { getContext } from "@/lib/get-context";

export const runtime = "nodejs";

const CHAT_MODEL = "claude-sonnet-4-5";
const MAX_INPUT_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 24;
const MAX_OUTPUT_TOKENS = 700;
const RATE_LIMIT_MESSAGES = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const STREAM_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "no-store",
};

const hitsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (hitsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT_MESSAGES) {
    hitsByIp.set(ip, hits);
    return true;
  }
  hits.push(now);
  hitsByIp.set(ip, hits);
  return false;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

function parseBody(body: unknown): {
  messages: IncomingMessage[];
  locale: Locale;
} | null {
  if (typeof body !== "object" || body === null) return null;
  const record = body as Record<string, unknown>;
  const locale: Locale = record.locale === "en" ? "en" : "fr";
  if (!Array.isArray(record.messages) || record.messages.length === 0)
    return null;
  const messages: IncomingMessage[] = [];
  for (const raw of record.messages.slice(-MAX_HISTORY_MESSAGES)) {
    if (typeof raw !== "object" || raw === null) return null;
    const { role, content } = raw as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string" || content.trim() === "") return null;
    if (role === "user" && content.length > MAX_INPUT_LENGTH) return null;
    messages.push({ role, content });
  }
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return null;
  return { messages, locale };
}

function chatModel() {
  const workspaceId = process.env.ANTHROPIC_WORKSPACE_ID?.trim();
  return createAnthropic({
    headers: workspaceId
      ? { "anthropic-workspace-id": workspaceId }
      : undefined,
  })(CHAT_MODEL);
}

function errorMessage(error: unknown): string {
  if (APICallError.isInstance(error)) return error.message;
  if (error instanceof Error) return error.message;
  return "";
}

function isWorkspaceRequiredError(error: unknown): boolean {
  const message = errorMessage(error);
  return (
    message.includes("anthropic-workspace-id") ||
    message.includes("not scoped to a workspace")
  );
}

function isCreditError(error: unknown): boolean {
  const message = errorMessage(error).toLowerCase();
  return (
    message.includes("credit balance") ||
    message.includes("too low to access the anthropic api")
  );
}

function debugChatError(error: unknown) {
  const status = APICallError.isInstance(error) ? error.statusCode : undefined;
  const message = errorMessage(error);
  const data = APICallError.isInstance(error) ? error.data : undefined;
  console.error("[DEBUG] chat stream error", status, message, data);
}

function textStreamResponse(text: string): Response {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(text));
        controller.close();
      },
    }),
    { headers: STREAM_HEADERS },
  );
}

function byteStreamFromStrings(stream: ReadableStream<string>): Response {
  const encoder = new TextEncoder();
  return new Response(
    stream.pipeThrough(
      new TransformStream<string, Uint8Array>({
        transform(chunk, controller) {
          if (chunk) controller.enqueue(encoder.encode(chunk));
        },
      }),
    ),
    { headers: STREAM_HEADERS },
  );
}

function creditFallbackResponse(locale: Locale): Response {
  return textStreamResponse(
    locale === "en"
      ? "I can't reply from this chat right now. Email me at huguesromainpro@gmail.com and I'll answer in person."
      : "Je ne peux pas répondre depuis ce chat pour le moment. Écris-moi à huguesromainpro@gmail.com, je répondrai moi-même.",
  );
}

function providerErrorResponse(error: unknown, locale: Locale): Response {
  debugChatError(error);
  if (isCreditError(error)) return creditFallbackResponse(locale);
  if (isWorkspaceRequiredError(error)) {
    return Response.json({ error: "workspace_required" }, { status: 503 });
  }
  const status = APICallError.isInstance(error) ? error.statusCode : undefined;
  const httpStatus =
    typeof status === "number" && status >= 400 && status < 600 ? status : 502;
  return Response.json({ error: "upstream" }, { status: httpStatus });
}

async function toChatTextResponse(
  result: ReturnType<typeof streamText>,
  locale: Locale,
): Promise<Response> {
  const reader = result.fullStream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return Response.json({ error: "empty" }, { status: 502 });
      }
      if (value.type === "error") {
        return providerErrorResponse(value.error, locale);
      }
      if (value.type !== "text-delta" || !value.text) continue;
      const first = value.text;
      const stream = new ReadableStream<string>({
        start(controller) {
          controller.enqueue(first);
          void (async () => {
            try {
              while (true) {
                const next = await reader.read();
                if (next.done) {
                  controller.close();
                  return;
                }
                if (next.value.type === "error") {
                  debugChatError(next.value.error);
                  controller.close();
                  return;
                }
                if (next.value.type === "text-delta" && next.value.text) {
                  controller.enqueue(next.value.text);
                }
              }
            } catch (error) {
              debugChatError(error);
              controller.close();
            }
          })();
        },
        cancel() {
          void reader.cancel();
        },
      });
      return byteStreamFromStrings(stream);
    }
  } catch (error) {
    return providerErrorResponse(error, locale);
  }
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "rate_limit", limit: RATE_LIMIT_MESSAGES },
      { status: 429 },
    );
  }

  let parsed: ReturnType<typeof parseBody>;
  try {
    parsed = parseBody(await request.json());
  } catch {
    parsed = null;
  }
  if (!parsed) {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const lastQuestion =
    parsed.messages[parsed.messages.length - 1]?.content ?? "";
  const corpus = await getContext(lastQuestion, parsed.locale);

  const result = streamText({
    model: chatModel(),
    system: buildSystemPrompt(corpus),
    messages: parsed.messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0.4,
  });

  return toChatTextResponse(result, parsed.locale);
}
