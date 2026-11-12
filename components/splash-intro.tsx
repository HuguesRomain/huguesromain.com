"use client";

import { useEffect, useRef, useState } from "react";
import { createRenderer, FLASH } from "@/lib/ascii-black-hole";

// The opening plays the model 3.5x as fast: the flash lands at about 2.6 s.
const SPEED = 3.5;
const FADE_MS = 650;

type Phase = "play" | "flash" | "done";

// Read once: StrictMode runs effects twice in dev, and the second run must not
// see a half-cleaned state.
let shouldPlay: boolean | null = null;

export function SplashIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("play");

  useEffect(() => {
    const root = document.documentElement;
    const cv = canvasRef.current;
    // The inline <head> script decides whether the intro plays this session.
    shouldPlay ??= root.dataset.intro === "1";
    if (!shouldPlay || !cv) {
      setPhase("done");
      return;
    }
    (window as Window & { __introStarted?: boolean }).__introStarted = true;
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}

    const renderer = createRenderer(cv);
    if (!renderer) {
      delete root.dataset.intro;
      setPhase("done");
      return;
    }

    let raf = 0;
    let ending = false;
    let start = performance.now();
    const timers: number[] = [];

    const resize = () => renderer.layout(window.innerWidth, window.innerHeight);
    resize();

    const finish = () => {
      if (ending) return;
      ending = true;
      setPhase("flash");
      // white peak, then the whole overlay fades out over the site
      timers.push(
        window.setTimeout(() => {
          root.dataset.intro = "fading"; // page scrolls again during the fade
        }, 120),
        window.setTimeout(() => {
          cancelAnimationFrame(raf);
          delete root.dataset.intro;
          setPhase("done");
        }, 120 + FADE_MS),
      );
    };

    const frame = (now: number) => {
      const t = ((now - start) / 1000) * SPEED;
      renderer.draw(t);
      if (t >= FLASH - 0.15) finish();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame((now) => {
      start = now;
      frame(now);
    });

    const skip = () => finish();
    const events = ["pointerdown", "keydown", "wheel", "touchmove"] as const;
    for (const e of events) window.addEventListener(e, skip, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      for (const e of events) window.removeEventListener(e, skip);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className="splash-intro fixed inset-0 z-[100] bg-black"
      style={{
        opacity: phase === "flash" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-out 120ms`,
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div
        className="absolute inset-0 bg-[#fff4de]"
        style={{
          opacity: phase === "flash" ? 1 : 0,
          transition: "opacity 120ms ease-in",
        }}
      />
    </div>
  );
}
