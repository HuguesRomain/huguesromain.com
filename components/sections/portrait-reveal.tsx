"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AsciiCanvas } from "@/components/ascii/ascii-canvas";

const CELL_STEPS = [12, 10, 8, 6, 5, 4] as const;
const REVEAL_MS = 600;

export function PortraitReveal({
  src,
  alt,
  hint,
}: {
  src: string;
  alt: string;
  hint: string;
}) {
  const [cell, setCell] = useState<number>(CELL_STEPS[0]);
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  function animate(target: boolean) {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setRevealed(target);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setCell(target ? CELL_STEPS[CELL_STEPS.length - 1] ?? 4 : CELL_STEPS[0]);
      return;
    }
    const steps = target ? CELL_STEPS : [...CELL_STEPS].reverse();
    const interval = REVEAL_MS / steps.length;
    steps.forEach((value, index) => {
      timers.current.push(
        window.setTimeout(() => setCell(value), interval * index),
      );
    });
  }

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => animate(true)}
      onMouseLeave={() => animate(false)}
      onFocus={() => animate(true)}
      onBlur={() => animate(false)}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-bg-panel"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 380px, 90vw"
        className={`object-cover transition-opacity duration-600 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      />
      <AsciiCanvas
        src={src}
        cellSize={cell}
        animated={!revealed}
        speed={0.6}
        className={`absolute inset-0 transition-opacity duration-600 ${
          revealed ? "opacity-0" : "opacity-100"
        }`}
      />
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted opacity-70 transition-opacity duration-300 group-hover:opacity-0">
        {hint}
      </span>
    </div>
  );
}
