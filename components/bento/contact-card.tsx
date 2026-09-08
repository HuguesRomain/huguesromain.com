import type { Profile } from "@/content/types";
import {
  TODO_BOOKING_URL,
  TODO_LINKEDIN_URL,
} from "@/content/profile.fr";
import { BentoCard, CardLabel } from "./card";

export function ContactCard({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  const hasLinkedin =
    profile.contact.linkedin && profile.contact.linkedin !== TODO_LINKEDIN_URL;
  const hasBooking =
    profile.contact.booking && profile.contact.booking !== TODO_BOOKING_URL;

  return (
    <BentoCard id="contact" className="col-span-6">
      <div className="flex flex-col items-center gap-7 px-6 py-14 text-center sm:py-16">
        <CardLabel>{fr ? "Contact" : "Contact"}</CardLabel>
        <h2 className="max-w-[560px] text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          {fr
            ? "Une mission, une question, une archi à valider ?"
            : "A mission, a question, an architecture to validate?"}
        </h2>
        <a
          href={`mailto:${profile.contact.email}`}
          className="contact-email text-[clamp(1.1rem,2.6vw,1.6rem)] font-medium tracking-[-0.01em]"
        >
          {profile.contact.email}
        </a>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-full border border-surface-border px-5 text-[13px] font-medium text-text transition-colors hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
          {hasLinkedin ? (
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full border border-surface-border px-5 text-[13px] font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          ) : (
            <span className="inline-flex h-10 items-center rounded-full border border-surface-border px-5 text-[13px] font-medium text-text-muted opacity-50">
              LinkedIn
            </span>
          )}
          {hasBooking ? (
            <a
              href={profile.contact.booking}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full bg-text px-5 text-[13px] font-medium text-bg transition-opacity hover:opacity-85"
            >
              {profile.contact.bookingLabel}
            </a>
          ) : (
            <span className="inline-flex h-10 items-center rounded-full bg-text/40 px-5 text-[13px] font-medium text-bg opacity-60">
              {profile.contact.bookingLabel}
            </span>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
