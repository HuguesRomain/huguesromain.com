"use client";

import {
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

const RIPPLE_MS = 600;

type Ripple = { id: number; x: number; y: number; size: number };

type AskButtonProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  height?: number;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
};

export function AskButton({
  children,
  ariaLabel,
  className = "",
  height = 42,
  type = "submit",
  disabled = false,
  onClick,
}: AskButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple: Ripple = {
          id: Date.now(),
          x: event.clientX - rect.left - size / 2,
          y: event.clientY - rect.top - size / 2,
          size,
        };
        setRipples((prev) => [...prev, ripple]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, RIPPLE_MS);
      }
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden text-[13px] font-medium text-[#f4f1ee] transition-[filter,opacity] duration-200 hover:enabled:brightness-125 disabled:opacity-50 ${className}`}
      style={{
        height,
        minWidth: height,
        borderRadius: height / 2,
        background: "linear-gradient(180deg, #202020, #000)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden
          className="metal-ripple absolute z-0 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      <span className="relative z-10 px-4">{children}</span>
    </button>
  );
}
