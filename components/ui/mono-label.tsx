import type { ReactNode } from "react";

export function MonoLabel({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted ${className}`}
    >
      {index ? `${index} / ` : null}
      {children}
    </span>
  );
}
