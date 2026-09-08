"use client";

import { useEffect, useRef, useState } from "react";

// ── Constantes de rendu, à régler à la main ──────────────────────────────
// Rampe de caractères, du noir (espace) aux hautes lumières (@)
const RAMP = " .:-=+*#%@";
// Boucle partagée bridée à 30 fps
const FPS = 30;
// Ajustements avant échantillonnage
const BRIGHTNESS = 1.12; // +12 %
const CONTRAST = 1.15; // 115 %
// Post-effets
const BLOOM_ALPHA = 0.25; // intensité du halo (25 %)
const BLOOM_BLUR_PX = 7; // rayon du halo en px CSS
const BLOOM_THRESHOLD = 0.55; // seuls les caractères au-dessus participent
const VIGNETTE = 0.38; // assombrissement des bords (38 %)
// Onde diagonale : amplitude ~60 % de l'effet max, période ~6 s
const WAVE_MAX_DELTA = 0.28; // effet max sur la luminance
const WAVE_AMPLITUDE = 0.6 * WAVE_MAX_DELTA;
const WAVE_PERIOD_S = 6;
const WAVE_DIAGONAL_STEP = 0.55; // déphasage par cellule (diagonale)
// Quantification luminance → (glyphe, couleur) pour dessiner par lots
const LEVELS = 24;
// Plafond de devicePixelRatio
const MAX_DPR = 2;
// ─────────────────────────────────────────────────────────────────────────

type Rgb = [number, number, number];

function parseHex(value: string): Rgb {
  const hex = value.trim().replace("#", "");
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

let paletteCache: { dim: Rgb; accent: Rgb } | null = null;

function getPalette(): { dim: Rgb; accent: Rgb } {
  if (paletteCache) return paletteCache;
  const styles = getComputedStyle(document.documentElement);
  paletteCache = {
    dim: parseHex(styles.getPropertyValue("--ascii-dim") || "#5e2110"),
    accent: parseHex(styles.getPropertyValue("--accent") || "#ff5a2b"),
  };
  return paletteCache;
}

function levelColor(t: number): string {
  const { dim, accent } = getPalette();
  const r = Math.round(dim[0] + (accent[0] - dim[0]) * t);
  const g = Math.round(dim[1] + (accent[1] - dim[1]) * t);
  const b = Math.round(dim[2] + (accent[2] - dim[2]) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached) return cached;
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`ascii: image introuvable ${src}`));
    img.src = src;
  });
  imageCache.set(src, promise);
  return promise;
}

const sampleCache = new Map<string, Float32Array>();

function sampleLuminance(
  img: HTMLImageElement,
  src: string,
  cols: number,
  rows: number,
): Float32Array {
  const key = `${src}|${cols}x${rows}`;
  const cached = sampleCache.get(key);
  if (cached) return cached;

  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx) return new Float32Array(cols * rows);

  const targetRatio = cols / rows;
  const sourceRatio = img.naturalWidth / img.naturalHeight;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (sourceRatio > targetRatio) {
    sw = img.naturalHeight * targetRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / targetRatio;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.filter = `grayscale(1) brightness(${BRIGHTNESS}) contrast(${CONTRAST})`;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
  const data = ctx.getImageData(0, 0, cols, rows).data;
  const samples = new Float32Array(cols * rows);
  for (let i = 0; i < samples.length; i++) {
    samples[i] = (data[i * 4] ?? 0) / 255;
  }
  sampleCache.set(key, samples);
  return samples;
}

type Instance = {
  render: (dt: number) => void;
  visible: boolean;
};

const instances = new Set<Instance>();
let rafId: number | null = null;
let lastFrame = 0;

function loopTick(now: number) {
  rafId = requestAnimationFrame(loopTick);
  const elapsed = now - lastFrame;
  if (elapsed < 1000 / FPS) return;
  lastFrame = now;
  const dt = Math.min(elapsed / 1000, 0.2);
  for (const instance of instances) {
    if (instance.visible) instance.render(dt);
  }
}

function syncLoop() {
  const shouldRun =
    instances.size > 0 && typeof document !== "undefined" && !document.hidden;
  if (shouldRun && rafId === null) {
    lastFrame = performance.now();
    rafId = requestAnimationFrame(loopTick);
  } else if (!shouldRun && rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", syncLoop);
}

export function canAnimateAscii(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  if (navigator.hardwareConcurrency < 4) return false;
  if (!window.matchMedia("(min-width: 640px)").matches) return false;
  return true;
}

type AsciiCanvasProps = {
  src: string;
  cellSize?: number;
  animated?: boolean;
  speed?: number;
  className?: string;
  onFirstFrame?: () => void;
};

export function AsciiCanvas({
  src,
  cellSize = 16,
  animated = true,
  speed = 1,
  className = "",
  onFirstFrame,
}: AsciiCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(speed);
  const firstFrameRef = useRef(onFirstFrame);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    firstFrameRef.current = onFirstFrame;
  }, [onFirstFrame]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    let disposed = false;
    let image: HTMLImageElement | null = null;
    let time = 0;
    let cols = 0;
    let rows = 0;
    let cell = 0;
    let base: Float32Array = new Float32Array(0);
    let vignette: CanvasGradient | null = null;
    const colors: string[] = [];
    const glyphs: string[] = [];
    let signaled = false;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const animate = animated && canAnimateAscii();

    for (let level = 0; level < LEVELS; level++) {
      const t = level / (LEVELS - 1);
      colors.push(levelColor(t));
      glyphs.push(
        RAMP[Math.min(RAMP.length - 1, Math.floor(t * RAMP.length))] ?? " ",
      );
    }

    const buckets: number[][] = Array.from({ length: LEVELS }, () => []);

    function draw() {
      if (!ctx || !canvas || cols === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cell}px var(--font-jetbrains-mono), monospace`;
      ctx.textBaseline = "top";

      for (const bucket of buckets) bucket.length = 0;
      const wavePhase = (2 * Math.PI * time) / WAVE_PERIOD_S;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          let lum = base[i] ?? 0;
          if (animate) {
            lum +=
              WAVE_AMPLITUDE *
              Math.sin(wavePhase - (col + row) * WAVE_DIAGONAL_STEP);
          }
          lum = Math.min(1, Math.max(0, lum));
          const level = Math.min(LEVELS - 1, Math.floor(lum * LEVELS));
          if (level > 0) buckets[level]?.push(i);
        }
      }

      for (let level = 1; level < LEVELS; level++) {
        const bucket = buckets[level];
        if (!bucket || bucket.length === 0) continue;
        const glyph = glyphs[level] ?? " ";
        if (glyph === " ") continue;
        ctx.fillStyle = colors[level] ?? "#000";
        for (const i of bucket) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          ctx.fillText(glyph, col * cell, row * cell);
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = BLOOM_ALPHA;
      ctx.filter = `blur(${BLOOM_BLUR_PX * dpr}px) brightness(${1 + BLOOM_THRESHOLD})`;
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();

      if (vignette) {
        ctx.save();
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }

      if (!signaled) {
        signaled = true;
        firstFrameRef.current?.();
      }
    }

    const instance: Instance = {
      visible: true,
      render(dt: number) {
        time += dt * speedRef.current;
        draw();
      },
    };

    function layout() {
      if (!wrapper || !canvas || !image || disposed) return;
      const rect = wrapper.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      cell = Math.max(2, Math.round(cellSize * dpr));
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      cols = Math.ceil(canvas.width / cell);
      rows = Math.ceil(canvas.height / cell);
      base = sampleLuminance(image, src, cols, rows);
      if (ctx) {
        vignette = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          Math.min(canvas.width, canvas.height) * 0.35,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height) * 0.72,
        );
        vignette.addColorStop(0, "rgba(0,0,0,0)");
        vignette.addColorStop(1, `rgba(0,0,0,${VIGNETTE})`);
      }
      draw();
    }

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(wrapper);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      instance.visible = entry?.isIntersecting ?? true;
    });
    intersectionObserver.observe(wrapper);

    loadImage(src)
      .then((img) => {
        if (disposed) return;
        image = img;
        layout();
        setReady(true);
        if (animate) {
          instances.add(instance);
          syncLoop();
        }
      })
      .catch(() => {});

    return () => {
      disposed = true;
      instances.delete(instance);
      syncLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [src, cellSize, animated]);

  return (
    <div ref={wrapperRef} aria-hidden className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-600 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
