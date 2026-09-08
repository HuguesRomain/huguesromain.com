"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { ChatStrings } from "@/content/types";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { AskButton } from "@/components/ui/ask-button";

const PLACEHOLDER_INTERVAL_MS = 4000;
const MAX_INPUT_LENGTH = 500;

export function PromptBar({
  strings,
  disabled,
  onSend,
  onEscape,
  autoFocus = false,
  hideChips = false,
  align = "center",
}: {
  strings: ChatStrings;
  disabled: boolean;
  onSend: (text: string) => void;
  onEscape?: () => void;
  autoFocus?: boolean;
  hideChips?: boolean;
  align?: "center" | "start";
}) {
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex(
        (index) => (index + 1) % strings.placeholders.length,
      );
    }, PLACEHOLDER_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [strings.placeholders.length]);

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
        <LiquidGlass
          radius={26}
          className="w-full transition-shadow duration-300 focus-within:shadow-[0_0_0_1px_var(--accent)]"
          contentClassName="flex items-end gap-3 py-2.5 pl-5 pr-2.5"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            maxLength={MAX_INPUT_LENGTH}
            aria-label={strings.inputAriaLabel}
            placeholder={strings.placeholders[placeholderIndex]}
            onChange={(event) => {
              setValue(event.target.value);
              autoGrow();
            }}
            onKeyDown={onKeyDown}
            className="prompt-input min-h-[42px] flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-[1.6] text-text placeholder:text-[14px] placeholder:text-text-muted"
          />
          <AskButton
            ariaLabel={strings.sendAriaLabel}
            height={42}
            disabled={disabled}
          >
            ASK
          </AskButton>
        </LiquidGlass>
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
