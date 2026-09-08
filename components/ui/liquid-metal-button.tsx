"use client";

import {
  ShaderMount,
  liquidMetalFragmentShader,
  toProcessedLiquidMetal,
} from "@paper-design/shaders";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

const RING_WIDTH = 3;
const REST_SPEED = 0.6;
const HOVER_SPEED = 1;
const CLICK_SPEED = 2.4;
const CLICK_BOOST_MS = 300;
const RIPPLE_MS = 600;

export type MetalTune = {
  repetition: number;
  softness: number;
  shiftRed: number;
  shiftBlue: number;
  distortion: number;
  contour: number;
  angle: number;
};

export const DEFAULT_METAL_TUNE: MetalTune = {
  repetition: 4,
  softness: 0.35,
  shiftRed: 0.4,
  shiftBlue: -0.35,
  distortion: 0.12,
  contour: 0.7,
  angle: 55,
};

const ACCENT_TINT: [number, number, number, number] = [1, 0.42, 0.22, 1];

function tuneToUniforms(tune: MetalTune) {
  return {
    u_repetition: tune.repetition,
    u_softness: tune.softness,
    u_shiftRed: tune.shiftRed,
    u_shiftBlue: tune.shiftBlue,
    u_distortion: tune.distortion,
    u_contour: tune.contour,
    u_angle: tune.angle,
  };
}

let mountTaken = false;

function supportsWebGl(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
}

function createPillMask(width: number, height: number): string {
  const scale = 4;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(2, Math.round(width * scale));
  canvas.height = Math.max(2, Math.round(height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.roundRect(0, 0, canvas.width, canvas.height, canvas.height / 2);
  ctx.fill();
  const inset = RING_WIDTH * scale;
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.roundRect(
    inset,
    inset,
    canvas.width - inset * 2,
    canvas.height - inset * 2,
    (canvas.height - inset * 2) / 2,
  );
  ctx.fill();
  return canvas.toDataURL("image/png");
}

type Ripple = { id: number; x: number; y: number; size: number };

type LiquidMetalButtonProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  height?: number;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  tune?: MetalTune;
};

export function LiquidMetalButton({
  children,
  ariaLabel,
  className = "",
  height = 46,
  type = "submit",
  disabled = false,
  onClick,
  tune = DEFAULT_METAL_TUNE,
}: LiquidMetalButtonProps) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mountRef = useRef<ShaderMount | null>(null);
  const hoveredRef = useRef(false);
  const boostTimer = useRef<number | null>(null);
  const initialTuneRef = useRef(tune);
  const [shaderReady, setShaderReady] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    const button = buttonRef.current;
    if (!host || !button) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const narrow = !window.matchMedia("(min-width: 640px)").matches;
    if (reduced || narrow || mountTaken || !supportsWebGl()) return;

    mountTaken = true;
    let cancelled = false;
    let objectUrl: string | null = null;

    const rect = button.getBoundingClientRect();
    const maskUrl = createPillMask(rect.width, rect.height);

    async function boot() {
      try {
        const { pngBlob } = await toProcessedLiquidMetal(maskUrl);
        if (cancelled) return;
        objectUrl = URL.createObjectURL(pngBlob);
        const img = new Image();
        img.src = objectUrl;
        await img.decode();
        if (cancelled || !host) return;
        mountRef.current = new ShaderMount(
          host,
          liquidMetalFragmentShader,
          {
            u_colorBack: [0, 0, 0, 0],
            u_colorTint: ACCENT_TINT,
            u_image: img,
            u_shape: 0,
            u_isImage: true,
            u_fit: 1,
            u_scale: 1,
            u_rotation: 0,
            u_originX: 0.5,
            u_originY: 0.5,
            u_offsetX: 0,
            u_offsetY: 0,
            u_worldWidth: 0,
            u_worldHeight: 0,
            ...tuneToUniforms(initialTuneRef.current),
          },
          undefined,
          REST_SPEED,
        );
        setShaderReady(true);
      } catch {
        mountTaken = false;
      }
    }

    void boot();

    return () => {
      cancelled = true;
      if (boostTimer.current !== null) window.clearTimeout(boostTimer.current);
      if (mountRef.current) {
        mountRef.current.dispose();
        mountRef.current = null;
        mountTaken = false;
      } else {
        mountTaken = false;
      }
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  useEffect(() => {
    mountRef.current?.setUniforms(tuneToUniforms(tune));
  }, [tune]);

  const setSpeed = useCallback((speed: number) => {
    mountRef.current?.setSpeed(speed);
  }, []);

  const handleEnter = useCallback(() => {
    hoveredRef.current = true;
    setSpeed(HOVER_SPEED);
  }, [setSpeed]);

  const handleLeave = useCallback(() => {
    hoveredRef.current = false;
    setSpeed(REST_SPEED);
  }, [setSpeed]);

  const handleClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple: Ripple = {
          id: Date.now(),
          x: event.clientX - rect.left - size / 2,
          y: event.clientY - rect.top - size / 2,
          size,
        };
        setRipples((prev) => [...prev, ripple]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, RIPPLE_MS);
      }
      setSpeed(CLICK_SPEED);
      if (boostTimer.current !== null) window.clearTimeout(boostTimer.current);
      boostTimer.current = window.setTimeout(() => {
        setSpeed(hoveredRef.current ? HOVER_SPEED : REST_SPEED);
      }, CLICK_BOOST_MS);
      onClick?.(event);
    },
    [onClick, setSpeed],
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative inline-flex items-center justify-center overflow-hidden font-mono text-[12px] uppercase tracking-[0.08em] text-[#f4f1ee] disabled:opacity-50 ${className}`}
      style={{
        height,
        minWidth: height,
        borderRadius: height / 2,
        background: "linear-gradient(180deg, #202020, #000)",
        boxShadow: shaderReady
          ? "0 8px 16px rgba(0,0,0,0.45), 0 2px 5px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.14), inset 0 -1px 1px rgba(0,0,0,0.5)"
          : "0 8px 16px rgba(0,0,0,0.45), 0 2px 5px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,90,43,0.35), inset 0 1px 1px rgba(255,255,255,0.14), inset 0 -1px 1px rgba(0,0,0,0.5)",
        transformStyle: "preserve-3d",
      }}
    >
      <span
        ref={hostRef}
        aria-hidden
        className={`liquid-metal-host absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500 ${
          shaderReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translateZ(0px)" }}
      />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden
          className="metal-ripple absolute z-10 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      <span
        className="relative z-20 px-5"
        style={{ transform: "translateZ(2px)" }}
      >
        {children}
      </span>
    </button>
  );
}
