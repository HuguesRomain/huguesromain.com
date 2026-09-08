"use client";

import {
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type GlassMode = "distort" | "blur";

let cachedMode: GlassMode | null = null;

function detectMode(): GlassMode {
  if (cachedMode !== null) return cachedMode;
  const isChromium = /Chrome\//.test(navigator.userAgent);
  const isWide = window.matchMedia("(min-width: 640px)").matches;
  cachedMode = isChromium && isWide ? "distort" : "blur";
  return cachedMode;
}

function subscribeNoop(): () => void {
  return () => {};
}

type LiquidGlassProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  radius?: number;
  distortion?: number;
  morph?: boolean;
  as?: ElementType;
  href?: string;
};

export function LiquidGlass({
  children,
  className = "",
  contentClassName = "",
  radius = 24,
  distortion = 1,
  morph = false,
  as,
  href,
}: LiquidGlassProps) {
  const mode = useSyncExternalStore<GlassMode>(
    subscribeNoop,
    detectMode,
    () => "blur",
  );

  const Comp: ElementType = href ? "a" : (as ?? "div");
  const distorted = mode === "distort" && distortion > 0;

  const backdropLayer: CSSProperties = distorted
    ? {
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        filter: "url(#glass-distortion)",
        isolation: "isolate",
      }
    : {
        backdropFilter: "blur(20px) saturate(130%)",
        WebkitBackdropFilter: "blur(20px) saturate(130%)",
      };

  const edgeLayer: CSSProperties = {
    backdropFilter: "blur(1px)",
    WebkitBackdropFilter: "blur(1px)",
    filter: "url(#glass-distortion-edge)",
    isolation: "isolate",
    padding: "12px",
    maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
    maskClip: "content-box, border-box",
    maskComposite: "exclude",
    WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
    WebkitMaskClip: "content-box, border-box",
    WebkitMaskComposite: "xor",
  };

  return (
    <Comp
      {...(href ? { href } : {})}
      className={`liquid-glass ${morph ? "liquid-glass-morph" : ""} relative isolate ${className}`}
      style={{ "--lg-radius": `${radius}px` } as CSSProperties}
    >
      <span
        aria-hidden
        className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={backdropLayer}
      />
      {distorted ? (
        <span
          aria-hidden
          className="absolute inset-0 z-[5] overflow-hidden rounded-[inherit]"
          style={edgeLayer}
        />
      ) : null}
      <span
        aria-hidden
        className="absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: "var(--glass-tint)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 z-20 rounded-[inherit]"
        style={{ boxShadow: "var(--glass-inset)" }}
      />
      <div className={`relative z-30 ${contentClassName}`}>{children}</div>
    </Comp>
  );
}
