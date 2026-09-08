import Image from "next/image";
import type { Profile } from "@/content/types";
import { ProfileChat } from "./profile-chat";

export function Intro({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-surface-border">
          <Image
            src={profile.about.portrait}
            alt={profile.about.portraitAlt}
            fill
            sizes="56px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-[22px] font-semibold tracking-[-0.02em]">
            {profile.name}
          </h1>
          <p className="text-[15px] text-text-muted">
            {fr ? "Ingénieur full-stack & IA" : "Full-stack & AI engineer"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <p className="text-[13px] font-medium text-text-muted">
          {fr
            ? "Disponible pour missions · Nice · remote friendly"
            : "Available for work · Nice · remote friendly"}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-[16px] leading-[1.65] text-text">
          {fr
            ? "Je conçois et construis des produits web et mobiles de bout en bout — architecture, agents IA, mise en production. Freelance sous ma société Axiome, co-fondateur d'aiOrigin, une plateforme d'agents IA autonomes pour l'entreprise."
            : "I design and build web and mobile products end to end — architecture, AI agents, all the way to production. Freelance under my company Axiome, co-founder of aiOrigin, a platform of autonomous AI agents for the enterprise."}
        </p>
        <p className="text-[15px] leading-[1.65] text-text-muted">
          {profile.about.paragraphs[1]}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <ProfileChat profile={profile} />
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.contact.email}`}
            className="inline-flex h-10 items-center rounded-full bg-text px-5 text-[13px] font-medium text-bg transition-opacity hover:opacity-85"
          >
            {fr ? "M'écrire" : "Get in touch"}
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-full border border-surface-border px-5 text-[13px] font-medium text-text transition-colors hover:bg-surface"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
