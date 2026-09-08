"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import dynamic from "next/dynamic";
import type { ChatStrings } from "@/content/types";
import { CornerFrame } from "@/components/ui/corner-frame";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const METAL_FALLBACK_STYLE = {
  height: 42,
  minWidth: 42,
  borderRadius: 21,
  background: "linear-gradient(180deg, #202020, #000)",
  boxShadow:
    "0 8px 16px rgba(0,0,0,0.45), 0 2px 5px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.14), inset 0 -1px 1px rgba(0,0,0,0.5)",
} as const;

const LiquidMetalButton = dynamic(
  () =>
    import("@/components/ui/liquid-metal-button").then(
      (mod) => mod.LiquidMetalButton,
    ),
  {
    ssr: false,
    loading: () => (
      <span
        aria-hidden
        className="inline-flex items-center justify-center px-5 font-mono text-[12px] uppercase tracking-[0.08em] text-[#f4f1ee]"
        style={METAL_FALLBACK_STYLE}
      >
        ASK
      </span>
    ),
  },
);

const PLACEHOLDER_INTERVAL_MS = 4000;
const MAX_INPUT_LENGTH = 500;

export function PromptBar({
  strings,
  disabled,
  onSend,
  onEscape,
}: {
  strings: ChatStrings;
  disabled: boolean;
  onSend: (text: string) => void;
  onEscape: () => void;
}) {
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    if (event.key === "Escape") onEscape();
  }

  function autoGrow() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }

  return (
    <div className="flex w-full max-w-[640px] flex-col items-center gap-5">
      <CornerFrame className="w-full p-2">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(value);
          }}
          className="w-full"
        >
          <LiquidGlass
            radius={24}
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
              className="prompt-input min-h-[42px] flex-1 resize-none bg-transparent py-2.5 font-mono text-[13px] leading-[1.6] text-text placeholder:text-[11px] placeholder:uppercase placeholder:tracking-[0.08em] placeholder:text-text-muted"
            />
            <LiquidMetalButton
              ariaLabel={strings.sendAriaLabel}
              height={42}
              disabled={disabled}
            >
              ASK
            </LiquidMetalButton>
          </LiquidGlass>
        </form>
      </CornerFrame>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {strings.chips.map((chip) => (
          <button
            key={chip}
            type="button"
            disabled={disabled}
            onClick={() => submit(chip)}
            className="rounded-full border border-surface-border bg-surface px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text disabled:opacity-50"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
