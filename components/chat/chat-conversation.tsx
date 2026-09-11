"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ChatStrings } from "@/content/types";
import { SOFIA_FINAL_EMOJI, SOFIA_PLACEHOLDERS } from "@/content/sofia";
import { PromptBar } from "@/components/hero/prompt-bar";
import { HeartRain } from "./heart-rain";
import { Markdown } from "./markdown";
import type { ChatController } from "./use-chat";

const EASE = [0.16, 1, 0.3, 1] as const;
const STICK_THRESHOLD_PX = 80;
const TYPING_MIN_MS = 560;

type VirtualKeyboard = {
  overlaysContent: boolean;
  boundingRect: { height: number };
  addEventListener: (type: "geometrychange", listener: () => void) => void;
  removeEventListener: (type: "geometrychange", listener: () => void) => void;
};

function useChatKeyboardInset() {
  const [inset, setInset] = useState(0);
  const [shellH, setShellH] = useState<number>();
  const focusedRef = useRef(false);
  const insetRef = useRef(0);
  const fullHRef = useRef(0);
  const syncRef = useRef(() => {});

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    html.setAttribute("data-chat-open", "");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const vk = (navigator as Navigator & { virtualKeyboard?: VirtualKeyboard })
      .virtualKeyboard;
    if (vk) vk.overlaysContent = true;

    const layoutH = () =>
      Math.round(
        Math.max(
          html.clientHeight,
          window.innerHeight,
          window.visualViewport?.height ?? 0,
        ),
      );

    fullHRef.current = layoutH();
    setShellH(fullHRef.current);

    const pinWindow = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    const sync = () => {
      pinWindow();
      const vv = window.visualViewport;
      const vkHeight = vk?.boundingRect.height ?? 0;
      let next = 0;
      if (focusedRef.current) {
        if (vv) {
          const full = Math.max(fullHRef.current, layoutH());
          next = Math.round(
            Math.max(vkHeight, full - vv.height - vv.offsetTop),
          );
        } else {
          next = Math.round(vkHeight);
        }
        next = next >= 80 ? next : 0;
      } else {
        const h = layoutH();
        fullHRef.current = h;
        setShellH((prev) => (prev === h ? prev : h));
      }
      if (next === insetRef.current) return;
      insetRef.current = next;
      setInset(next);
    };

    syncRef.current = sync;

    const vv = window.visualViewport;
    vv?.addEventListener("resize", sync);
    vv?.addEventListener("scroll", sync);
    vk?.addEventListener("geometrychange", sync);
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", pinWindow, { passive: true });
    sync();

    return () => {
      syncRef.current = () => {};
      vv?.removeEventListener("resize", sync);
      vv?.removeEventListener("scroll", sync);
      vk?.removeEventListener("geometrychange", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", pinWindow);
      if (vk) vk.overlaysContent = false;
      html.removeAttribute("data-chat-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  function setInputFocused(focused: boolean) {
    focusedRef.current = focused;
    if (focused) window.scrollTo(0, 0);
    syncRef.current();
  }

  return { inset, shellH, setInputFocused };
}

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
  className = "text-text-muted hover:text-text",
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-[13px] transition-colors ${className}`}
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
  promptLayoutId,
  autoFocusInput = false,
  onClose,
}: {
  chat: ChatController;
  strings: ChatStrings;
  name: string;
  portrait: string;
  portraitAlt: string;
  onlineLabel: string;
  typingLabel: string;
  promptLayoutId?: string;
  autoFocusInput?: boolean;
  onClose: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const reducedMotion = useReducedMotion();
  const streaming = chat.busy;
  const [minElapsed, setMinElapsed] = useState(true);
  const { inset: keyboardInset, shellH, setInputFocused } = useChatKeyboardInset();

  const last = chat.messages[chat.messages.length - 1];
  const lastIsTypingPlaceholder =
    last?.role === "assistant" &&
    !last.stickerSrc &&
    last.content.trim().length === 0;
  const showTyping =
    chat.status === "streaming" &&
    (!minElapsed || lastIsTypingPlaceholder);

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
  }, [chat.messages, chat.status, showTyping, keyboardInset]);

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

  return createPortal(
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
      className={`fixed inset-x-0 top-0 z-[70] flex h-svh max-h-svh flex-col overflow-hidden overscroll-none ${
        chat.sofiaMode ? "sofia-chat" : "bg-bg"
      }`}
      style={shellH ? { height: shellH, maxHeight: shellH } : undefined}
    >
      <HeartRain
        active={chat.sofiaMode}
        reduced={Boolean(reducedMotion)}
      />
      <header
        className={
          chat.sofiaMode
            ? "sticky top-0 z-30 flex items-center gap-3 border-b border-white/10 bg-[rgba(8,12,22,0.42)] px-3 py-2.5 text-[#f5f5f7] backdrop-blur-xl sm:border-surface-border sm:bg-bg/80 sm:px-5 sm:text-text"
            : "sticky top-0 z-30 flex items-center gap-3 border-b border-surface-border bg-bg/80 px-3 py-2.5 backdrop-blur-xl sm:px-5"
        }
      >
        <PeerAvatar src={portrait} alt={portraitAlt} size={40} />
        <div className="min-w-0 flex-1">
          <p
            className={
              chat.sofiaMode
                ? "truncate text-[15px] font-semibold tracking-[-0.02em] text-[#f5f5f7] sm:text-text"
                : "truncate text-[15px] font-semibold tracking-[-0.02em] text-text"
            }
          >
            {name}
          </p>
          <p
            className={
              chat.sofiaMode
                ? "flex min-w-0 items-center gap-1.5 truncate text-[12px] text-white/70 sm:text-text-muted"
                : "flex min-w-0 items-center gap-1.5 truncate text-[12px] text-text-muted"
            }
          >
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            <span className="truncate">{onlineLabel}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {chat.busy ? (
            <TextAction
              label={strings.stop}
              onClick={chat.stop}
              className={
                chat.sofiaMode
                  ? "text-white/70 hover:text-white sm:text-text-muted sm:hover:text-text"
                  : "text-text-muted hover:text-text"
              }
            />
          ) : chat.messages.length > 0 ? (
            <TextAction
              label={strings.clear}
              onClick={chat.clear}
              className={
                chat.sofiaMode
                  ? "text-white/70 hover:text-white sm:text-text-muted sm:hover:text-text"
                  : "text-text-muted hover:text-text"
              }
            />
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label={strings.close}
            className={
              chat.sofiaMode
                ? "flex h-8 w-8 items-center justify-center rounded-full text-[17px] leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:text-text-muted sm:hover:bg-surface sm:hover:text-text"
                : "flex h-8 w-8 items-center justify-center rounded-full text-[17px] leading-none text-text-muted transition-colors hover:bg-surface hover:text-text"
            }
          >
            ✕
          </button>
        </div>
      </header>
      <div
        ref={listRef}
        onScroll={onScroll}
        aria-live="polite"
        className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-3 sm:px-5"
        style={
          keyboardInset > 0 ? { paddingBottom: keyboardInset } : undefined
        }
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
            if (message.stickerSrc) {
              return (
                <div key={message.id} className="flex items-end gap-2">
                  <PeerAvatar src={portrait} alt={portraitAlt} size={28} decorative />
                  <img
                    src={message.stickerSrc}
                    alt=""
                    draggable={false}
                    className="h-[148px] w-auto max-w-[min(220px,70%)] select-none object-contain"
                  />
                </div>
              );
            }
            if (isLast && showTyping) return null;
            if (message.content === SOFIA_FINAL_EMOJI) {
              return (
                <div key={message.id} className="flex items-end gap-2">
                  <PeerAvatar src={portrait} alt={portraitAlt} size={28} decorative />
                  <p className="select-none text-[42px] leading-none">
                    {SOFIA_FINAL_EMOJI}
                  </p>
                </div>
              );
            }
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
      <div
        className={
          chat.sofiaMode
            ? "relative z-20 shrink-0 touch-auto border-t border-white/10 px-3 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:border-surface-border/70 sm:px-5"
            : "relative z-20 shrink-0 touch-auto border-t border-surface-border/70 px-3 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-5"
        }
        style={
          keyboardInset > 0
            ? {
                transform: `translate3d(0, ${-keyboardInset}px, 0)`,
                paddingBottom: 12,
              }
            : undefined
        }
      >
        <motion.div
          layoutId={promptLayoutId}
          transition={
            reducedMotion || !promptLayoutId
              ? { duration: 0 }
              : { duration: 0.6, ease: EASE }
          }
          className="mx-auto flex w-full max-w-[640px] justify-center"
        >
          <PromptBar
            strings={strings}
            disabled={chat.busy}
            onSend={(text) => void chat.send(text)}
            onEscape={onClose}
            autoFocus={autoFocusInput}
            hideChips
            onFocusChange={setInputFocused}
            placeholders={
              chat.sofiaMode ? SOFIA_PLACEHOLDERS : undefined
            }
          />
        </motion.div>
      </div>
    </motion.div>,
    document.body,
  );
}
