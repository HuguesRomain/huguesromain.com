import type { Profile } from "@/content/types";
import { TODO_LINKEDIN_URL } from "@/content/profile.fr";
import { BentoCard, CardLabel } from "./card";

export function StatusCard({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  const hasLinkedin =
    profile.contact.linkedin && profile.contact.linkedin !== TODO_LINKEDIN_URL;
  return (
    <BentoCard className="col-span-6 lg:col-span-2">
      <div className="flex h-full flex-col justify-between gap-8 p-7">
        <div className="flex flex-col gap-4">
          <CardLabel>{fr ? "Statut" : "Status"}</CardLabel>
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="text-[15px] font-medium">
              {fr ? "Disponible pour missions" : "Available for work"}
            </p>
          </div>
          <p className="text-[13px] leading-[1.6] text-text-muted">
            {fr
              ? "Paris · remote friendly · FR / EN"
              : "Paris · remote friendly · FR / EN"}
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <a
            href={`mailto:${profile.contact.email}`}
            className="inline-flex h-11 items-center justify-center rounded-full bg-text px-6 text-[14px] font-medium text-bg transition-opacity hover:opacity-85"
          >
            {fr ? "M'écrire" : "Get in touch"}
          </a>
          <div className="flex items-center justify-center gap-4 text-[13px] text-text-muted">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-text"
            >
              GitHub
            </a>
            {hasLinkedin ? (
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-text"
              >
                LinkedIn
              </a>
            ) : (
              <span className="opacity-40">LinkedIn</span>
            )}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
