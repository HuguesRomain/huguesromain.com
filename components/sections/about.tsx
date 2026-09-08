import type { Profile } from "@/content/types";
import { PortraitReveal } from "./portrait-reveal";
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
        <PortraitReveal
          src={profile.about.portrait}
          alt={profile.about.portraitAlt}
          hint={profile.about.portraitHint}
        />
      </div>
    </section>
  );
}
