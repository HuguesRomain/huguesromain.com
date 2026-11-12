"use client";

import { useEffect, useRef } from "react";
import { createRenderer } from "@/lib/ascii-black-hole";

const STILL_T = 13;

export function BlackHole() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const cv = canvasRef.current;
    if (!box || !cv) return;
    const renderer = createRenderer(cv, { mono: { fontPx: 9 } });
    if (!renderer) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let still = motionQuery.matches;
    let raf = 0;
    let visible = false;
    let started = false; // the intro starts the first time the block is seen
    let elapsed = 0; // animation time, paused while off screen
    let last = 0;

    const frame = (now: number) => {
      elapsed += (now - last) / 1000;
      last = now;
      renderer.draw(elapsed);
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const start = () => {
      if (raf || still || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const paint = () => renderer.draw(still ? STILL_T : started ? elapsed : 0);

    const resize = () => {
      const { width, height } = box.getBoundingClientRect();
      renderer.layout(width, height);
      paint();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(box);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          started = true;
          start();
        } else stop();
      },
      { threshold: 0.15 },
    );
    io.observe(box);

    const onMotionChange = () => {
      still = motionQuery.matches;
      if (still) stop();
      else start();
      paint();
    };
    motionQuery.addEventListener("change", onMotionChange);

    const replay = () => {
      if (still) return;
      elapsed = 0;
      started = true;
      start();
    };
    box.addEventListener("click", replay);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      box.removeEventListener("click", replay);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="h-[130px] w-[280px] shrink-0 cursor-pointer select-none"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
