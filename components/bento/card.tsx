import type { ReactNode } from "react";

export function BentoCard({
  children,
  className = "",
  hover = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`bento-card overflow-hidden ${hover ? "bento-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-text-muted">
      {children}
    </p>
  );
}
