"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ChatStrings } from "@/content/types";
import { PromptBar } from "@/components/hero/prompt-bar";
import { Markdown } from "./markdown";
import type { ChatController } from "./use-chat";

const EASE = [0.16, 1, 0.3, 1] as const;
const STICK_THRESHOLD_PX = 80;

function ActionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-surface-border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text"
    >
      {label}
    </button>
  );
}

export function ChatConversation({
  chat,
  strings,
  onClose,
}: {
  chat: ChatController;
  strings: ChatStrings;
  onClose: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const reducedMotion = useReducedMotion();
  const streaming = chat.status === "streaming";

  useEffect(() => {
    document.documentElement.setAttribute("data-chat-open", "");
    return () => document.documentElement.removeAttribute("data-chat-open");
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const list = listRef.current;
    if (list && stickRef.current) list.scrollTop = list.scrollHeight;
  }, [chat.messages, chat.status]);

  function onScroll() {
    const list = listRef.current;
    if (!list) return;
    stickRef.current =
      list.scrollHeight - list.scrollTop - list.clientHeight <
      STICK_THRESHOLD_PX;
  }

  const errorMessage =
    chat.status === "error-network"
      ? strings.errorNetwork
      : chat.status === "error-ratelimit"
        ? strings.errorRateLimit
        : chat.status === "error-empty"
          ? strings.errorEmpty
          : null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={strings.panelAriaLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={
        reducedMotion
          ? { duration: 0.15 }
          : { duration: 0.35, ease: EASE }
      }
      className="fixed inset-0 z-[70] flex flex-col bg-bg"
    >
      <div className="flex items-center justify-between gap-4 border-b border-surface-border px-6 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          {strings.panelTitle}
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted opacity-60 md:block">
            {strings.closeHint}
          </span>
          {streaming ? (
            <ActionButton label={strings.stop} onClick={chat.stop} />
          ) : chat.messages.length > 0 ? (
            <ActionButton label={strings.clear} onClick={chat.clear} />
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label={strings.close}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-border font-mono text-[13px] text-text-muted transition-colors hover:text-text"
          >
            ✕
          </button>
        </div>
      </div>
      <div
        ref={listRef}
        onScroll={onScroll}
        aria-live="polite"
        className="flex-1 overflow-y-auto px-6"
      >
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-7 py-10">
          {chat.messages.map((message, index) => {
            const isLast = index === chat.messages.length - 1;
            if (message.role === "user") {
              return (
                <div key={message.id} className="flex flex-col items-end gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted opacity-70">
                    {strings.youLabel}
                  </span>
                  <p className="max-w-[85%] rounded-2xl rounded-br-md border border-surface-border bg-surface px-4 py-2.5 font-mono text-[13px] leading-[1.7] text-text">
                    {message.content}
                  </p>
                </div>
              );
            }
            return (
              <div key={message.id} className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted opacity-70">
                  {strings.meLabel}
                </span>
                <div>
                  <Markdown content={message.content} />
                  {isLast && streaming ? (
                    <span aria-hidden className="chat-cursor" />
                  ) : null}
                </div>
              </div>
            );
          })}
          {errorMessage ? (
            <div className="flex flex-col items-start gap-3">
              <p className="font-mono text-[12px] leading-[1.7] text-text-muted">
                {errorMessage}
              </p>
              {chat.status !== "error-ratelimit" ? (
                <ActionButton label={strings.retry} onClick={chat.retry} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="px-6 pb-6 pt-3">
        <motion.div
          layoutId="prompt-bar"
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: EASE }
          }
          className="mx-auto flex w-full max-w-[640px] justify-center"
        >
          <PromptBar
            strings={strings}
            disabled={streaming}
            onSend={(text) => void chat.send(text)}
            onEscape={onClose}
            autoFocus
            hideChips
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
