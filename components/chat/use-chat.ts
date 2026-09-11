"use client";

import { useCallback, useRef, useState } from "react";
import {
  RateLimitError,
  type ChatMessage,
  type ChatTransport,
} from "@/lib/chat-transport";
import {
  isRodasLastName,
  isSofiaFirstNameOnly,
  isSofiaRodas,
  lastNameQuestion,
  revealOpening,
  SOFIA_FINAL_EMOJI,
  SOFIA_STICKERS,
} from "@/content/sofia";

export type ChatStatus =
  | "idle"
  | "streaming"
  | "revealing"
  | "error-network"
  | "error-ratelimit"
  | "error-empty";

const ASK_PAUSE_MS = 640;
const REVEAL_PAUSE_MS = 780;
const STICKER_GAP_MS = 520;
const TYPE_MS = 16;

let nextId = 0;

function makeId(): string {
  nextId += 1;
  return `msg-${nextId}`;
}

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("aborted", "AbortError"));
      return;
    }
    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

export function useChat(transport: ChatTransport, locale: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [sofiaMode, setSofiaMode] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const lastQuestionRef = useRef<string>("");
  const messagesRef = useRef<ChatMessage[]>([]);
  const sofiaModeRef = useRef(false);
  const awaitingLastNameRef = useRef(false);

  const commit = useCallback((next: ChatMessage[]) => {
    messagesRef.current = next;
    setMessages(next);
  }, []);

  const patch = useCallback((id: string, content: string) => {
    setMessages((prev) => {
      const next = prev.map((message) =>
        message.id === id ? { ...message, content } : message,
      );
      messagesRef.current = next;
      return next;
    });
  }, []);

  const enterSofia = useCallback(() => {
    sofiaModeRef.current = true;
    setSofiaMode(true);
    awaitingLastNameRef.current = false;
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    commit([]);
    sofiaModeRef.current = false;
    awaitingLastNameRef.current = false;
    setSofiaMode(false);
    setStatus("idle");
  }, [commit]);

  const typeContent = useCallback(
    async (id: string, text: string, signal: AbortSignal) => {
      let acc = "";
      for (const char of text) {
        await wait(TYPE_MS, signal);
        acc += char;
        patch(id, acc);
      }
    },
    [patch],
  );

  const streamFromApi = useCallback(
    async (history: ChatMessage[], assistantId: string, signal: AbortSignal) => {
      let received = "";
      try {
        for await (const token of transport(history, locale, signal)) {
          received += token;
          patch(assistantId, received);
        }
        if (received.trim() === "") {
          commit(messagesRef.current.filter((m) => m.id !== assistantId));
          setStatus("error-empty");
        } else {
          setStatus("idle");
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          if (received.trim() === "") {
            commit(messagesRef.current.filter((m) => m.id !== assistantId));
          }
          setStatus("idle");
        } else if (received.trim() !== "") {
          setStatus("idle");
        } else {
          commit(messagesRef.current.filter((m) => m.id !== assistantId));
          setStatus(
            error instanceof RateLimitError ? "error-ratelimit" : "error-network",
          );
        }
      }
    },
    [commit, locale, patch, transport],
  );

  const playReveal = useCallback(
    async (signal: AbortSignal) => {
      awaitingLastNameRef.current = false;
      const assistantId = makeId();
      commit([
        ...messagesRef.current,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setStatus("streaming");
      await wait(REVEAL_PAUSE_MS, signal);
      enterSofia();
      await typeContent(assistantId, revealOpening(), signal);
      setStatus("revealing");
      for (const stickerSrc of SOFIA_STICKERS) {
        await wait(STICKER_GAP_MS, signal);
        commit([
          ...messagesRef.current,
          { id: makeId(), role: "assistant", content: "", stickerSrc },
        ]);
      }
      await wait(STICKER_GAP_MS, signal);
      commit([
        ...messagesRef.current,
        { id: makeId(), role: "assistant", content: SOFIA_FINAL_EMOJI },
      ]);
      setStatus("idle");
    },
    [commit, enterSofia, typeContent],
  );

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || abortRef.current) return;
      lastQuestionRef.current = question;

      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: question,
      };
      const history: ChatMessage[] = [...messagesRef.current, userMessage];
      commit(history);

      const controller = new AbortController();
      abortRef.current = controller;
      const { signal } = controller;

      try {
        if (
          !sofiaModeRef.current &&
          (isSofiaRodas(question) ||
            (awaitingLastNameRef.current && isRodasLastName(question)))
        ) {
          await playReveal(signal);
          return;
        }

        if (!sofiaModeRef.current && isSofiaFirstNameOnly(question)) {
          awaitingLastNameRef.current = true;
          const assistantId = makeId();
          commit([
            ...history,
            { id: assistantId, role: "assistant", content: "" },
          ]);
          setStatus("streaming");
          await wait(ASK_PAUSE_MS, signal);
          await typeContent(assistantId, lastNameQuestion(question), signal);
          setStatus("idle");
          return;
        }

        const assistantId = makeId();
        commit([
          ...history,
          { id: assistantId, role: "assistant", content: "" },
        ]);
        setStatus("streaming");
        await streamFromApi(history, assistantId, signal);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setStatus("error-network");
        } else {
          setStatus("idle");
        }
      } finally {
        abortRef.current = null;
      }
    },
    [commit, playReveal, streamFromApi, typeContent],
  );

  const retry = useCallback(() => {
    const question = lastQuestionRef.current;
    if (!question) return;
    setMessages((prev) => {
      const trimmed = [...prev];
      const last = trimmed[trimmed.length - 1];
      if (last && last.role === "user" && last.content === question) {
        trimmed.pop();
      }
      messagesRef.current = trimmed;
      return trimmed;
    });
    setStatus("idle");
    queueMicrotask(() => void send(question));
  }, [send]);

  const busy = status === "streaming" || status === "revealing";

  return { messages, status, send, stop, clear, retry, sofiaMode, busy };
}

export type ChatController = ReturnType<typeof useChat>;
