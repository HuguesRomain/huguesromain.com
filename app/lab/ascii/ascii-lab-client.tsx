"use client";

import { useState } from "react";
import { AsciiCanvas } from "@/components/ascii/ascii-canvas";
import { MonoLabel } from "@/components/ui/mono-label";

const DEMO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
  <rect width="800" height="500" fill="black"/>
  <defs>
    <radialGradient id="glow" cx="35%" cy="40%" r="45%">
      <stop offset="0%" stop-color="white"/>
      <stop offset="55%" stop-color="#777"/>
      <stop offset="100%" stop-color="black"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="white"/>
      <stop offset="100%" stop-color="#222"/>
    </linearGradient>
  </defs>
  <circle cx="280" cy="200" r="180" fill="url(#glow)"/>
  <rect x="430" y="60" width="90" height="380" rx="8" fill="url(#bar)" transform="rotate(18 475 250)"/>
  <circle cx="640" cy="360" r="70" fill="#ddd"/>
</svg>`;

const DEMO_SRC = `data:image/svg+xml,${encodeURIComponent(DEMO_SVG)}`;

export function AsciiLabClient() {
  const [speed, setSpeed] = useState(1);
  const [animated, setAnimated] = useState(true);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
      <div className="flex items-center gap-8">
        <MonoLabel index="003">Moteur ASCII — image de démo</MonoLabel>
        <label className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          <input
            type="checkbox"
            checked={animated}
            onChange={(e) => setAnimated(e.target.checked)}
            className="accent-accent"
          />
          Animé
        </label>
        <label className="flex flex-1 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
          Speed
          <input
            type="range"
            min={0.2}
            max={3}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 accent-accent"
          />
          {speed}
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <MonoLabel>cellSize 16 — fond de hero</MonoLabel>
        <AsciiCanvas
          src={DEMO_SRC}
          cellSize={16}
          animated={animated}
          speed={speed}
          className="h-[420px] w-full bg-bg-panel"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <MonoLabel>cellSize 8 — vignette projet</MonoLabel>
          <AsciiCanvas
            src={DEMO_SRC}
            cellSize={8}
            animated={animated}
            speed={speed}
            className="aspect-[16/10] w-full bg-bg-panel"
          />
        </div>
        <div className="flex flex-col gap-3">
          <MonoLabel>cellSize 12 — portrait</MonoLabel>
          <AsciiCanvas
            src={DEMO_SRC}
            cellSize={12}
            animated={animated}
            speed={speed}
            className="aspect-[16/10] w-full bg-bg-panel"
          />
        </div>
      </div>
    </div>
  );
}
