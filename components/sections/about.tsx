import Image from "next/image";
import type { Profile } from "@/content/types";
import { SectionHeader } from "./section-header";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeader
        label={profile.sections.about.label}
        title={profile.sections.about.title}
      />
      <div className="mt-16 grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_380px]">
        <div className="flex max-w-xl flex-col gap-6">
          {profile.about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-mono text-[14px] leading-[1.7] text-text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-bg-panel">
          <Image
            src={profile.about.portrait}
            alt={profile.about.portraitAlt}
            fill
            sizes="(min-width: 768px) 380px, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
