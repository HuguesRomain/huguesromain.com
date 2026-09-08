"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ChatStrings } from "@/content/types";
import { PromptBar } from "@/components/hero/prompt-bar";
import { Markdown } from "./markdown";
import type { ChatController } from "./use-chat";

const EASE = [0.16, 1, 0.3, 1] as const;
const STICK_THRESHOLD_PX = 80;
const TYPING_MIN_MS = 560;

function TypingDots({
  reduced,
  label,
}: {
  reduced: boolean;
  label: string;
}) {
  return (
    <span
      data-testid="typing-indicator"
      className="flex h-[18px] items-center gap-[5px] px-0.5"
      role="status"
      aria-label={label}
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="block size-[7px] rounded-full bg-text-muted"
          initial={false}
          animate={
            reduced
              ? { opacity: 0.55, y: 0 }
              : { opacity: [0.35, 1, 0.35], y: [0, -3.5, 0] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 0.9,
                  repeat: Infinity,
                  delay: index * 0.16,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </span>
  );
}

function TextAction({
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
      className="text-[13px] text-text-muted transition-colors hover:text-text"
    >
      {label}
    </button>
  );
}

function PeerAvatar({
  src,
  alt,
  size,
  decorative = false,
}: {
  src: string;
  alt: string;
  size: number;
  decorative?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      width={size}
      height={size}
      aria-hidden={decorative || undefined}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

export function ChatConversation({
  chat,
  strings,
  name,
  portrait,
  portraitAlt,
  onlineLabel,
  typingLabel,
  onClose,
}: {
  chat: ChatController;
  strings: ChatStrings;
  name: string;
  portrait: string;
  portraitAlt: string;
  onlineLabel: string;
  typingLabel: string;
  onClose: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const reducedMotion = useReducedMotion();
  const streaming = chat.status === "streaming";
  const [minElapsed, setMinElapsed] = useState(true);

  const last = chat.messages[chat.messages.length - 1];
  const lastAssistantText =
    last?.role === "assistant" ? last.content.trim() : "";
  const showTyping =
    streaming && (!minElapsed || lastAssistantText.length === 0);

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
    if (!streaming) return undefined;
    let holdTimer = 0;
    const startTimer = window.setTimeout(() => {
      setMinElapsed(false);
      holdTimer = window.setTimeout(() => setMinElapsed(true), TYPING_MIN_MS);
    }, 0);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(holdTimer);
    };
  }, [streaming]);

  useEffect(() => {
    const list = listRef.current;
    if (list && stickRef.current) list.scrollTop = list.scrollHeight;
  }, [chat.messages, chat.status, showTyping]);

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
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-surface-border bg-bg/80 px-3 py-2.5 backdrop-blur-xl sm:px-5">
        <PeerAvatar src={portrait} alt={portraitAlt} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-text">
            {name}
          </p>
          <p className="flex items-center gap-1.5 text-[12px] text-text-muted">
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            {onlineLabel}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {streaming ? (
            <TextAction label={strings.stop} onClick={chat.stop} />
          ) : chat.messages.length > 0 ? (
            <TextAction label={strings.clear} onClick={chat.clear} />
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label={strings.close}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[17px] leading-none text-text-muted transition-colors hover:bg-surface hover:text-text"
          >
            ✕
          </button>
        </div>
      </header>
      <div
        ref={listRef}
        onScroll={onScroll}
        aria-live="polite"
        className="flex-1 overflow-y-auto px-3 sm:px-5"
      >
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-2 py-5">
          {chat.messages.map((message, index) => {
            const isLast = index === chat.messages.length - 1;
            if (message.role === "user") {
              return (
                <div key={message.id} className="flex justify-end">
                  <p className="max-w-[80%] rounded-[18px] rounded-br-[5px] bg-text px-3.5 py-2 text-[15px] leading-[1.45] break-words whitespace-pre-wrap text-bg">
                    {message.content}
                  </p>
                </div>
              );
            }
            if (isLast && showTyping) return null;
            return (
              <div key={message.id} className="flex items-end gap-2">
                <PeerAvatar src={portrait} alt={portraitAlt} size={28} decorative />
                <div className="max-w-[80%] rounded-[18px] rounded-bl-[5px] border border-surface-border bg-bg-panel px-3.5 py-2">
                  <Markdown
                    content={message.content}
                    className="flex flex-col gap-2 text-[15px] leading-[1.5] text-text"
                  />
                </div>
              </div>
            );
          })}
          {showTyping ? (
            <div className="flex items-end gap-2">
              <PeerAvatar src={portrait} alt={portraitAlt} size={28} decorative />
              <div className="rounded-[18px] rounded-bl-[5px] border border-surface-border bg-bg-panel px-3.5 py-2.5">
                <TypingDots
                  reduced={Boolean(reducedMotion)}
                  label={typingLabel}
                />
              </div>
            </div>
          ) : null}
          {errorMessage ? (
            <div className="flex flex-col items-start gap-2 px-10 pt-2">
              <p className="text-[13px] leading-[1.55] text-text-muted">
                {errorMessage}
              </p>
              {chat.status !== "error-ratelimit" ? (
                <TextAction label={strings.retry} onClick={chat.retry} />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-surface-border/70 px-3 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-5">
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
