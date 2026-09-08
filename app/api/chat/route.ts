import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
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
    model: anthropic(CHAT_MODEL),
    system: buildSystemPrompt(corpus),
    messages: parsed.messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0.4,
  });

  return result.toTextStreamResponse();
}
