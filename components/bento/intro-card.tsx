import Image from "next/image";
import type { Profile } from "@/content/types";
import { BentoCard } from "./card";

export function IntroCard({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  return (
    <BentoCard className="col-span-6 lg:col-span-4">
      <div className="flex h-full flex-col justify-between gap-8 p-7 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium text-text-muted">
              {fr ? "Bonjour, je suis" : "Hi, I'm"}
            </p>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              {profile.name}
            </h1>
          </div>
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-surface-border sm:size-20">
            <Image
              src={profile.about.portrait}
              alt={profile.about.portraitAlt}
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="max-w-[560px] text-[17px] leading-[1.55] text-text sm:text-[19px]">
            {fr
              ? "Ingénieur full-stack & IA freelance. Je conçois et construis des produits web et mobiles de bout en bout — architecture, agents IA, mise en production."
              : "Freelance full-stack & AI engineer. I design and build web and mobile products end to end — architecture, AI agents, all the way to production."}
          </p>
          <p className="text-[14px] leading-[1.6] text-text-muted">
            {profile.about.paragraphs[0]}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
