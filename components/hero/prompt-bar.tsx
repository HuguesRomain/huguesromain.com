"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useReducedMotion } from "motion/react";
import type { ChatStrings } from "@/content/types";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { AskButton } from "@/components/ui/ask-button";

const MAX_INPUT_LENGTH = 500;
const TYPE_MS = 40;
const DELETE_MS = 26;
const HOLD_MS = 1600;
const GAP_MS = 300;
const SWAP_MS = 4000;

function usePlaceholderTypewriter(
  phrases: readonly string[],
  enabled: boolean,
) {
  const reducedMotion = useReducedMotion();
  const reduce = reducedMotion === true;
  const [display, setDisplay] = useState("");
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const mode = useRef<"type" | "hold" | "delete" | "gap">("type");

  useEffect(() => {
    if (!enabled || phrases.length === 0) return;

    if (reduce) {
      phraseIndex.current = 0;
      setDisplay(phrases[0]);
      const timer = window.setInterval(() => {
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        setDisplay(phrases[phraseIndex.current]);
      }, SWAP_MS);
      return () => window.clearInterval(timer);
    }

    charIndex.current = 0;
    mode.current = "type";
    setDisplay("");

    let timeout = 0;
    const tick = () => {
      const chars = Array.from(phrases[phraseIndex.current] ?? "");
      if (mode.current === "type") {
        charIndex.current += 1;
        setDisplay(chars.slice(0, charIndex.current).join(""));
        if (charIndex.current >= chars.length) {
          mode.current = "hold";
          timeout = window.setTimeout(tick, HOLD_MS);
        } else {
          timeout = window.setTimeout(tick, TYPE_MS);
        }
        return;
      }
      if (mode.current === "hold") {
        mode.current = "delete";
        timeout = window.setTimeout(tick, DELETE_MS);
        return;
      }
      if (mode.current === "delete") {
        charIndex.current = Math.max(0, charIndex.current - 1);
        setDisplay(chars.slice(0, charIndex.current).join(""));
        if (charIndex.current <= 0) {
          mode.current = "gap";
          timeout = window.setTimeout(tick, GAP_MS);
        } else {
          timeout = window.setTimeout(tick, DELETE_MS);
        }
        return;
      }
      phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
      charIndex.current = 0;
      mode.current = "type";
      timeout = window.setTimeout(tick, TYPE_MS);
    };

    timeout = window.setTimeout(tick, TYPE_MS);
    return () => window.clearTimeout(timeout);
  }, [enabled, phrases, reduce]);

  return display;
}

export function PromptBar({
  strings,
  disabled,
  onSend,
  onEscape,
  autoFocus = false,
  hideChips = false,
  align = "center",
  placeholders,
  onFocusChange,
}: {
  strings: ChatStrings;
  disabled: boolean;
  onSend: (text: string) => void;
  onEscape?: () => void;
  autoFocus?: boolean;
  hideChips?: boolean;
  align?: "center" | "start";
  placeholders?: readonly string[];
  onFocusChange?: (focused: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const phrases = placeholders ?? strings.placeholders;
  const animatePlaceholder = !focused && value.length === 0;
  const placeholder = usePlaceholderTypewriter(
    phrases,
    animatePlaceholder,
  );

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  function submit(text: string) {
    const question = text.trim();
    if (!question || disabled) return;
    onSend(question);
    setValue("");
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = "auto";
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit(value);
    }
    if (event.key === "Escape") onEscape?.();
  }

  function autoGrow() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }

  const start = align === "start";

  return (
    <div
      className={
        start
          ? "flex w-full flex-col items-stretch gap-3"
          : "flex w-full max-w-[640px] flex-col items-center gap-4"
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(value);
        }}
        className="w-full"
      >
        <div
          className="prompt-pill relative w-full"
          style={{ "--lg-radius": "26px" } as CSSProperties}
        >
          <LiquidGlass
            radius={26}
            className="w-full"
            contentClassName="flex items-end gap-3 py-2.5 pl-5 pr-2.5"
          >
            <div className="relative min-h-[42px] min-w-0 flex-1">
              {animatePlaceholder ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center py-2.5 text-[16px] leading-[1.6] text-text-muted sm:text-[14px]"
                >
                  {placeholder}
                  <span className="prompt-ph-caret" />
                </span>
              ) : null}
              <textarea
                ref={textareaRef}
                rows={1}
                value={value}
                maxLength={MAX_INPUT_LENGTH}
                aria-label={strings.inputAriaLabel}
                placeholder=""
                onFocus={(event) => {
                  setFocused(true);
                  onFocusChange?.(true);
                  event.currentTarget.focus({ preventScroll: true });
                }}
                onBlur={() => {
                  setFocused(false);
                  onFocusChange?.(false);
                }}
                onChange={(event) => {
                  setValue(event.target.value);
                  autoGrow();
                }}
                onKeyDown={onKeyDown}
                className="prompt-input min-h-[42px] w-full resize-none bg-transparent py-2.5 text-[16px] leading-[1.6] text-text sm:text-[15px]"
              />
            </div>
            <AskButton
              ariaLabel={strings.sendAriaLabel}
              height={42}
              disabled={disabled}
            >
              ASK
            </AskButton>
          </LiquidGlass>
          <span className="prompt-glass-rim" aria-hidden="true">
            <span className="prompt-glass-sheen" />
            <span className="prompt-glass-sheen-fine" />
          </span>
        </div>
      </form>
      {hideChips ? null : (
        <div
          className={
            start
              ? "flex flex-wrap items-center justify-start gap-2"
              : "flex flex-wrap items-center justify-center gap-2.5"
          }
        >
          {strings.chips.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={disabled}
              onClick={() => submit(chip)}
              className={
                start
                  ? "rounded-full border border-surface-border px-3.5 py-1.5 text-[12px] font-medium text-text-muted transition-colors hover:text-text disabled:opacity-50"
                  : "rounded-full border border-surface-border bg-surface px-4 py-2 text-[13px] font-medium text-text-muted transition-colors hover:text-text disabled:opacity-50"
              }
            >
              {chip}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
