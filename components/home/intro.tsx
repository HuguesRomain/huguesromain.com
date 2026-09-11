import Image from "next/image";
import Link from "next/link";
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
            {fr
              ? "Ingénieur logiciel, architecte IA"
              : "Software engineer & AI architect"}
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
      <div className="flex items-center gap-3">
        <a
          href={`mailto:${profile.contact.email}`}
          aria-label={fr ? "Envoyer un e-mail" : "Send an email"}
          className="text-text-muted transition-colors hover:text-text"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="size-5"
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 3 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>
        </a>
        <a
          href={profile.contact.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-text-muted transition-colors hover:text-text"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="size-5"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-[16px] leading-[1.65] text-text">
          {fr ? (
            <>
              Ingénieur logiciel et architecte IA freelance à Nice. Je conçois
              et construis des produits web et mobiles de bout en bout, et je
              crée et mets en production des workflows et des agents IA.
              Freelance sous ma société{" "}
              <Link
                href={`/${profile.locale}/experience/axiome`}
                className="underline decoration-surface-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Axiome
              </Link>
              , co-fondateur d&apos;
              <Link
                href={`/${profile.locale}/experience/aiorigin`}
                className="underline decoration-surface-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                aiOrigin
              </Link>
              , une plateforme d&apos;agents IA autonomes pour l&apos;entreprise.
            </>
          ) : (
            <>
              Software engineer and AI architect, freelance in Nice. I build
              web and mobile products end to end, and I design and ship AI
              workflows and agents. Freelance under my company{" "}
              <Link
                href={`/${profile.locale}/experience/axiome`}
                className="underline decoration-surface-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Axiome
              </Link>
              , co-founder of{" "}
              <Link
                href={`/${profile.locale}/experience/aiorigin`}
                className="underline decoration-surface-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                aiOrigin
              </Link>
              , a platform of autonomous AI agents for the enterprise.
            </>
          )}
        </p>
        <p className="text-[15px] leading-[1.65] text-text-muted">
          {profile.about.paragraphs[1]}
        </p>
      </div>
      <ProfileChat profile={profile} />
    </header>
  );
}
