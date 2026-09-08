import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hugues Romain — Full-stack engineer & AI architect";

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
  const [regular, semibold] = await Promise.all([
    readFile(path.join(process.cwd(), "assets/fonts/Inter-Regular.otf")),
    readFile(path.join(process.cwd(), "assets/fonts/Inter-SemiBold.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f7",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            width: 1080,
            height: 510,
            background: "#ffffff",
            borderRadius: 48,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              fontWeight: 600,
              color: "#e8500f",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 6,
                background: "#e8500f",
              }}
            />
            {resolved === "fr"
              ? "Ingénieur full-stack, architecte IA"
              : "Full-stack engineer & AI architect"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 110,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#1d1d1f",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.4,
              color: "#86868b",
              maxWidth: 820,
              textAlign: "center",
            }}
          >
            {resolved === "fr"
              ? "Je crée et mets en production des workflows et des agents IA."
              : "I design and ship AI workflows and agents."}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, style: "normal", weight: 400 },
        { name: "Inter", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
