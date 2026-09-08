export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

export class RateLimitError extends Error {
  constructor() {
    super("rate limit");
    this.name = "RateLimitError";
  }
}

export type ChatTransport = (
  messages: readonly ChatMessage[],
  locale: string,
  signal: AbortSignal,
) => AsyncIterable<string>;

const FAKE_REPLY_FR = `Réponse **simulée** pour valider l'interface — le vrai modèle est branché à l'étape suivante.

- Streaming token par token avec curseur bloc
- Markdown : **gras**, \`code inline\`, [liens](https://github.com/huguesromain)
- Historique gardé en mémoire pendant la visite

Posez une autre question, ou testez \`/erreur\`, \`/limite\`, \`/vide\`.`;

const FAKE_REPLY_EN = `**Simulated** reply to validate the UI — the real model lands in the next step.

- Token-by-token streaming with a block cursor
- Markdown: **bold**, \`inline code\`, [links](https://github.com/huguesromain)
- History kept in memory during the visit

Ask another question, or try \`/erreur\`, \`/limite\`, \`/vide\`.`;

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

export const apiTransport: ChatTransport = async function* (
  messages,
  locale,
  signal,
) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      locale,
      messages: messages.map(({ role, content }) => ({ role, content })),
    }),
    signal,
  });
  if (response.status === 429) throw new RateLimitError();
  const contentType = response.headers.get("content-type") ?? "";
  if (
    !response.ok ||
    !response.body ||
    contentType.includes("application/json")
  ) {
    throw new Error("network");
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
};

export const fakeTransport: ChatTransport = async function* (
  messages,
  locale,
  signal,
) {
  const last = messages[messages.length - 1]?.content.trim().toLowerCase();
  await sleep(450, signal);
  if (last === "/erreur") throw new Error("network");
  if (last === "/limite") throw new RateLimitError();
  if (last === "/vide") return;
  const reply = locale === "fr" ? FAKE_REPLY_FR : FAKE_REPLY_EN;
  const tokens = reply.split(/(?<=\s)/);
  for (const token of tokens) {
    await sleep(24, signal);
    yield token;
  }
};
