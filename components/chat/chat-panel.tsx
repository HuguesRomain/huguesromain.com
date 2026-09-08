"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ChatStrings } from "@/content/types";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Markdown } from "./markdown";
import type { ChatController } from "./use-chat";

const EASE = [0.16, 1, 0.3, 1] as const;

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

export function ChatPanel({
  chat,
  strings,
  onClose,
}: {
  chat: ChatController;
  strings: ChatStrings;
  onClose: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const streaming = chat.status === "streaming";

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [chat.messages, chat.status]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="w-full max-w-[720px]"
    >
      <LiquidGlass
        radius={28}
        className="w-full"
        contentClassName="flex flex-col"
      >
        <div
          role="region"
          aria-label={strings.panelAriaLabel}
          className="flex flex-col"
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
            </div>
          </div>
          <div
            ref={listRef}
            aria-live="polite"
            className="flex max-h-[52svh] flex-col gap-7 overflow-y-auto px-6 py-6"
          >
            {chat.messages.map((message, index) => {
              const isLast = index === chat.messages.length - 1;
              return (
                <div key={message.id} className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted opacity-70">
                    {message.role === "user"
                      ? strings.youLabel
                      : strings.meLabel}
                  </span>
                  {message.role === "user" ? (
                    <p className="font-mono text-[13px] leading-[1.7] text-text">
                      {message.content}
                    </p>
                  ) : (
                    <div>
                      <Markdown content={message.content} />
                      {isLast && streaming ? (
                        <span aria-hidden className="chat-cursor" />
                      ) : null}
                    </div>
                  )}
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
      </LiquidGlass>
    </motion.div>
  );
}
