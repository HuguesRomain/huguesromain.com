import type { Profile } from "@/content/types";
import { AsciiImage } from "@/components/ascii/ascii-image";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6">
      <AsciiImage
        src="/images/hero-terraces.webp"
        alt=""
        cellSize={16}
        className="absolute inset-0"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,10,9,0.72) 0%, rgba(11,10,9,0.5) 45%, rgba(11,10,9,0.78) 100%)",
        }}
      />
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8 text-center">
        <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.02] tracking-[-0.02em]">
          {profile.heroFirstName} <em>{profile.heroLastName}</em>
        </h1>
        <p className="max-w-xl font-mono text-[12px] uppercase leading-[1.8] tracking-[0.08em] text-text-muted">
          {profile.tagline}
        </p>
      </div>
    </section>
  );
}
