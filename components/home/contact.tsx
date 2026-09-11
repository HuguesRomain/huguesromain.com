import Image from "next/image";
import type { Profile } from "@/content/types";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Section } from "./section";

export function Contact({ profile }: { profile: Profile }) {
  const hasLinkedin = Boolean(profile.contact.linkedin);
  const hasBooking = Boolean(profile.contact.booking);

  return (
    <Section id="contact" title="Contact">
      <div className="contact-view">
        <Image
          src="/images/contact-mars.webp"
          alt=""
          fill
          sizes="(max-width: 760px) calc(100vw - 40px), 760px"
          className="contact-view-photo object-cover"
          aria-hidden
        />
        <span aria-hidden className="contact-view-veil" />
        <LiquidGlass
          radius={28}
          className="contact-view-panel w-full"
          contentClassName="flex min-h-[228px] flex-col justify-between gap-8 p-7 sm:min-h-[260px] sm:px-8 sm:py-9"
        >
          <p className="max-w-[28rem] text-[15px] leading-[1.65] text-text">
            {profile.contact.intro}
          </p>
          <a
            href={`mailto:${profile.contact.email}`}
            className="contact-email max-w-full self-start break-words text-[clamp(1.12rem,3.4vw,1.62rem)] font-semibold tracking-[-0.03em]"
          >
            {profile.contact.email}
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noreferrer"
              className="contact-meta"
            >
              GitHub
              <span aria-hidden>↗</span>
            </a>
            {hasLinkedin ? (
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="contact-meta"
              >
                LinkedIn
                <span aria-hidden>↗</span>
              </a>
            ) : null}
            {hasBooking ? (
              <a
                href={profile.contact.booking}
                target="_blank"
                rel="noreferrer"
                className="contact-meta"
              >
                {profile.contact.bookingLabel}
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </LiquidGlass>
      </div>
    </Section>
  );
}
