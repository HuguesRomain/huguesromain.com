"use client";

import { useCallback, useRef, useState } from "react";
import {
  RateLimitError,
  type ChatMessage,
  type ChatTransport,
} from "@/lib/chat-transport";

export type ChatStatus =
  | "idle"
  | "streaming"
  | "error-network"
  | "error-ratelimit"
  | "error-empty";

let nextId = 0;

function makeId(): string {
  nextId += 1;
  return `msg-${nextId}`;
}

export function useChat(transport: ChatTransport, locale: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const abortRef = useRef<AbortController | null>(null);
  const lastQuestionRef = useRef<string>("");

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStatus("idle");
  }, []);

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
      const assistantId = makeId();
      const history: ChatMessage[] = [...messages, userMessage];
      setMessages([
        ...history,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setStatus("streaming");

      const controller = new AbortController();
      abortRef.current = controller;
      let received = "";

      try {
        for await (const token of transport(
          history,
          locale,
          controller.signal,
        )) {
          received += token;
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantId
                ? { ...message, content: received }
                : message,
            ),
          );
        }
        if (received.trim() === "") {
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          setStatus("error-empty");
        } else {
          setStatus("idle");
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          if (received.trim() === "") {
            setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          }
          setStatus("idle");
        } else {
          setMessages((prev) => prev.filter((m) => m.id !== assistantId));
          setStatus(
            error instanceof RateLimitError
              ? "error-ratelimit"
              : "error-network",
          );
        }
      } finally {
        abortRef.current = null;
      }
    },
    [messages, transport, locale],
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
      return trimmed;
    });
    setStatus("idle");
    queueMicrotask(() => void send(question));
  }, [send]);

  return { messages, status, send, stop, clear, retry };
}

export type ChatController = ReturnType<typeof useChat>;
