import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hugues Romain — Full-stack & AI engineer";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const profile = getProfile(resolved);
  const [serif, mono] = await Promise.all([
    readFile(
      path.join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.ttf"),
    ),
    readFile(
      path.join(process.cwd(), "assets/fonts/JetBrainsMono-Regular.ttf"),
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          background: "#0b0a09",
          border: "1px solid rgba(255,120,60,0.18)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 48,
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            letterSpacing: "0.08em",
            color: "rgba(244,241,238,0.55)",
          }}
        >
          {`001 / ${resolved.toUpperCase()}`}
        </div>
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 48,
            width: 14,
            height: 14,
            borderTop: "2px solid #ff5a2b",
            borderRight: "2px solid #ff5a2b",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 48,
            width: 14,
            height: 14,
            borderBottom: "2px solid #ff5a2b",
            borderLeft: "2px solid #ff5a2b",
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: 132,
            color: "#f4f1ee",
            letterSpacing: "-0.02em",
          }}
        >
          Hugues Romain
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "JetBrains Mono",
            fontSize: 26,
            letterSpacing: "0.08em",
            color: "rgba(244,241,238,0.55)",
            textTransform: "uppercase",
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          {profile.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal" },
        { name: "JetBrains Mono", data: mono, style: "normal" },
      ],
    },
  );
}
