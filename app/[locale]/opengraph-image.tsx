import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hugues Romain, Full-stack engineer & AI architect";

const CARD = { width: 1080, height: 510 };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

function dataUri(buffer: Buffer, mime: string) {
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolved = isLocale(locale) ? locale : "en";
  const profile = getProfile(resolved);
  const fontsDir = path.join(process.cwd(), "assets/fonts");
  const marsPath = path.join(process.cwd(), "public/images/contact-mars.webp");
  const [regular, semibold, sharpMod, marsBytes] = await Promise.all([
    readFile(path.join(fontsDir, "Inter-Regular.otf")),
    readFile(path.join(fontsDir, "Inter-SemiBold.otf")),
    import("sharp"),
    readFile(marsPath),
  ]);
  const sharp = sharpMod.default;
  const resized = await sharp(marsBytes)
    .resize(size.width, size.height, { fit: "cover", position: "centre" })
    .toBuffer();
  const [scene, frosted] = await Promise.all([
    sharp(resized).jpeg({ quality: 84 }).toBuffer(),
    sharp(resized).blur(18).jpeg({ quality: 80 }).toBuffer(),
  ]);
  const sceneSrc = dataUri(scene, "image/jpeg");
  const frostedSrc = dataUri(frosted, "image/jpeg");
  const cardLeft = (size.width - CARD.width) / 2;
  const cardTop = (size.height - CARD.height) / 2;
  const role =
    resolved === "fr"
      ? "Ingénieur full-stack, architecte IA"
      : "Full-stack engineer & AI architect";
  const tagline =
    resolved === "fr"
      ? "Je crée et mets en production des workflows et des agents IA."
      : "I design and ship AI workflows and agents.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#0a0a0a",
          fontFamily: "Inter",
        }}
      >
        <img
          src={sceneSrc}
          width={size.width}
          height={size.height}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            background: "rgba(10, 4, 2, 0.38)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            display: "flex",
            borderRadius: 260,
            background:
              "radial-gradient(circle, rgba(232,80,15,0.32) 0%, rgba(232,80,15,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -100,
            width: 560,
            height: 560,
            display: "flex",
            borderRadius: 280,
            background:
              "radial-gradient(circle, rgba(80,28,12,0.45) 0%, rgba(80,28,12,0) 68%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: CARD.width,
            height: CARD.height,
            borderRadius: 48,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.28)",
            boxShadow:
              "0 28px 70px rgba(0,0,0,0.48), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <img
            src={frostedSrc}
            width={size.width}
            height={size.height}
            alt=""
            style={{
              position: "absolute",
              top: -cardTop,
              left: -cardLeft,
              width: size.width,
              height: size.height,
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: CARD.width,
              height: CARD.height,
              display: "flex",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 38%, rgba(16,8,4,0.42) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: CARD.width,
              height: CARD.height,
              display: "flex",
              background: "rgba(16, 8, 4, 0.28)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: CARD.width,
              height: 2,
              display: "flex",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 8%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0) 92%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 280,
              height: 160,
              display: "flex",
              background:
                "radial-gradient(ellipse at top left, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: CARD.width,
              height: CARD.height,
              display: "flex",
              boxShadow:
                "inset 2px 2px 0 rgba(255,255,255,0.22), inset -1px -1px 0 rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
              position: "relative",
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
              {role}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 110,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "#f5f5f7",
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.4,
                color: "rgba(245,245,247,0.72)",
                maxWidth: 860,
                textAlign: "center",
              }}
            >
              {tagline}
            </div>
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
