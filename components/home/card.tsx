import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[24px] border border-surface-border bg-bg-panel shadow-[var(--card-shadow)] ${className}`}
    >
      {children}
    </div>
  );
}
