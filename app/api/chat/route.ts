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

function debugChatError(error: unknown) {
  if (APICallError.isInstance(error)) {
    console.error("[DEBUG] chat stream error", error.statusCode, error.message);
    return;
  }
  if (error instanceof Error) {
    console.error("[DEBUG] chat stream error", error.message);
    return;
  }
  console.error("[DEBUG] chat stream error", error);
}

function providerErrorResponse(error: unknown): Response {
  debugChatError(error);
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
): Promise<Response> {
  const reader = result.fullStream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return Response.json({ error: "empty" }, { status: 502 });
      }
      if (value.type === "error") {
        return providerErrorResponse(value.error);
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
                  controller.error(
                    next.value.error instanceof Error
                      ? next.value.error
                      : new Error("upstream"),
                  );
                  return;
                }
                if (next.value.type === "text-delta" && next.value.text) {
                  controller.enqueue(next.value.text);
                }
              }
            } catch (error) {
              controller.error(error);
            }
          })();
        },
        cancel() {
          void reader.cancel();
        },
      });
      return new Response(stream.pipeThrough(new TextEncoderStream()), {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
  } catch (error) {
    return providerErrorResponse(error);
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

  const lastQuestion = parsed.messages[parsed.messages.length - 1]?.content ?? "";
  const corpus = await getContext(lastQuestion, parsed.locale);

  const result = streamText({
    model: chatModel(),
    system: buildSystemPrompt(corpus),
    messages: parsed.messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0.4,
  });

  return toChatTextResponse(result);
}
