"use client";

import { useEffect, useState } from "react";
import { CornerFrame } from "@/components/ui/corner-frame";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import {
  DEFAULT_METAL_TUNE,
  LiquidMetalButton,
  type MetalTune,
} from "@/components/ui/liquid-metal-button";
import { MonoLabel } from "@/components/ui/mono-label";

const TUNE_FIELDS: {
  key: keyof MetalTune;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: "repetition", min: 1, max: 10, step: 0.5 },
  { key: "softness", min: 0, max: 1, step: 0.05 },
  { key: "shiftRed", min: -1, max: 1, step: 0.05 },
  { key: "shiftBlue", min: -1, max: 1, step: 0.05 },
  { key: "distortion", min: 0, max: 1, step: 0.02 },
  { key: "contour", min: 0, max: 1, step: 0.05 },
  { key: "angle", min: 0, max: 360, step: 5 },
];

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex items-center gap-3">
      <span className="w-28 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-accent"
      />
      <span className="w-12 text-right font-mono text-[11px] text-text-muted">
        {value}
      </span>
    </label>
  );
}

export function LabClient() {
  const [glassScale, setGlassScale] = useState(55);
  const [tune, setTune] = useState<MetalTune>(DEFAULT_METAL_TUNE);

  useEffect(() => {
    const map = document.getElementById("glass-distortion-map");
    map?.setAttribute("scale", String(glassScale));
  }, [glassScale]);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-16">
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(115deg, var(--bg) 0px, var(--bg) 38px, var(--bg-panel) 38px, var(--bg-panel) 76px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(255,90,43,0.22), transparent 45%), radial-gradient(circle at 75% 70%, rgba(255,90,43,0.14), transparent 40%)",
          }}
        />
        <p className="absolute left-1/2 top-24 -translate-x-1/2 whitespace-nowrap font-serif text-[9rem] leading-none tracking-[-0.02em] text-text/60">
          distortion <em>check</em>
        </p>
        <p className="absolute left-1/2 top-72 -translate-x-1/2 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.3em] text-text-muted">
          0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ ····························
        </p>
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-10 pt-64">
        <LiquidGlass radius={28} morph className="w-full">
          <div className="flex items-center gap-4 px-6 py-4">
            <span className="flex-1 font-mono text-[13px] uppercase tracking-[0.08em] text-text-muted">
              Quelle est ton expérience avec les agents IA ?
            </span>
            <LiquidMetalButton ariaLabel="Envoyer la question" tune={tune}>
              Send
            </LiquidMetalButton>
          </div>
        </LiquidGlass>

        <LiquidGlass radius={20} distortion={0} className="self-center">
          <div className="flex items-center gap-6 px-6 py-3">
            {["Work", "Stack", "About", "Contact"].map((item) => (
              <span
                key={item}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </LiquidGlass>

        <CornerFrame className="bg-bg-panel/90 p-6">
          <div className="flex flex-col gap-4">
            <MonoLabel index="001">Verre — scale de distorsion</MonoLabel>
            <Slider
              label="scale"
              value={glassScale}
              min={0}
              max={200}
              step={5}
              onChange={setGlassScale}
            />
            <MonoLabel index="002">Métal — uniforms du shader</MonoLabel>
            {TUNE_FIELDS.map((field) => (
              <Slider
                key={field.key}
                label={field.key}
                value={tune[field.key]}
                min={field.min}
                max={field.max}
                step={field.step}
                onChange={(value) =>
                  setTune((prev) => ({ ...prev, [field.key]: value }))
                }
              />
            ))}
            <p className="font-mono text-[11px] text-text-muted">
              Reporter les valeurs retenues dans DEFAULT_METAL_TUNE et dans le
              scale par défaut de GlassFilter.
            </p>
          </div>
        </CornerFrame>
      </div>
    </div>
  );
}
