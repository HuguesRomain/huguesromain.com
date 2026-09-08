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
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        filter: "url(#glass-distortion)",
        isolation: "isolate",
      }
    : {
        backdropFilter: "blur(20px) saturate(130%)",
        WebkitBackdropFilter: "blur(20px) saturate(130%)",
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
      <span
        aria-hidden
        className="absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: "rgba(255, 255, 255, 0.07)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 z-20 rounded-[inherit]"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255,255,255,0.22), inset -1px -1px 1px 1px rgba(255,255,255,0.14)",
        }}
      />
      <div className={`relative z-30 ${contentClassName}`}>{children}</div>
    </Comp>
  );
}
