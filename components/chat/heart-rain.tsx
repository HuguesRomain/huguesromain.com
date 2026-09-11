"use client";

import { useMemo } from "react";

type HeartSpec = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  dx: number;
  r0: number;
  r1: number;
  color: string;
};

const COLORS = ["#e8500f", "#f472b6", "#fb7185", "#ef4444", "#fb923c"];

function HeartIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

export function HeartRain({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  const hearts = useMemo<HeartSpec[]>(() => {
    if (!active || reduced) return [];
    return Array.from({ length: 38 }, (_, id) => ({
      id,
      left: Math.random() * 100,
      delay: Math.random() * 1.6,
      duration: 5.8 + Math.random() * 2.8,
      size: 11 + Math.random() * 16,
      dx: -18 + Math.random() * 36,
      r0: -28 + Math.random() * 56,
      r1: 40 + Math.random() * 80,
      color: COLORS[id % COLORS.length] ?? COLORS[0],
    }));
  }, [active, reduced]);

  if (!active) return null;

  return (
    <div
      className="sofia-heart-rain pointer-events-none absolute inset-0 z-40 overflow-hidden"
      aria-hidden
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="sofia-heart"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            color: heart.color,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            ["--dx" as string]: `${heart.dx}px`,
            ["--r0" as string]: `${heart.r0}deg`,
            ["--r1" as string]: `${heart.r1}deg`,
          }}
        >
          <HeartIcon size={heart.size} />
        </span>
      ))}
    </div>
  );
}
