import type { Profile } from "@/content/types";
import { AsciiImage } from "@/components/ascii/ascii-image";
import { HeroFlow } from "./hero-flow";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative overflow-hidden">
      <AsciiImage
        src="/images/hero-terraces.webp"
        alt=""
        cellSize={16}
        className="absolute inset-0"
        sizes="100vw"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(var(--veil-rgb),0.72) 0%, rgba(var(--veil-rgb),0.5) 45%, rgba(var(--veil-rgb),0.78) 100%)",
        }}
      />
      <HeroFlow profile={profile} />
    </section>
  );
}
