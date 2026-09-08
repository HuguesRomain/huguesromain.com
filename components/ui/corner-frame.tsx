import type { ReactNode } from "react";

const CORNERS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
] as const;

export function CornerFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {CORNERS.map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute h-3 w-3 border-grid-line ${pos}`}
        />
      ))}
      {children}
    </div>
  );
}
