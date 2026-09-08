import type { Profile } from "@/content/types";
import {
  TODO_BOOKING_URL,
  TODO_LINKEDIN_URL,
} from "@/content/profile.fr";
import { Card } from "./card";
import { Section } from "./section";

export function Contact({ profile }: { profile: Profile }) {
  const hasLinkedin =
    profile.contact.linkedin && profile.contact.linkedin !== TODO_LINKEDIN_URL;
  const hasBooking =
    profile.contact.booking && profile.contact.booking !== TODO_BOOKING_URL;

  return (
    <Section id="contact" title="Contact">
      <Card className="flex flex-col gap-5 p-6 sm:p-8">
        <p className="max-w-[480px] text-[15px] leading-[1.65] text-text-muted">
          {profile.contact.intro}
        </p>
        <a
          href={`mailto:${profile.contact.email}`}
          className="contact-email self-start text-[clamp(1.15rem,3vw,1.5rem)] font-semibold tracking-[-0.02em]"
        >
          {profile.contact.email}
        </a>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-full border border-surface-border px-5 text-[13px] font-medium text-text transition-colors hover:bg-surface"
          >
            GitHub
          </a>
          {hasLinkedin ? (
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full border border-surface-border px-5 text-[13px] font-medium text-text transition-colors hover:bg-surface"
            >
              LinkedIn
            </a>
          ) : null}
          {hasBooking ? (
            <a
              href={profile.contact.booking}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-full bg-text px-5 text-[13px] font-medium text-bg transition-opacity hover:opacity-85"
            >
              {profile.contact.bookingLabel}
            </a>
          ) : null}
        </div>
      </Card>
    </Section>
  );
}
