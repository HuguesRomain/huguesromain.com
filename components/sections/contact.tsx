import Image from "next/image";
import type { Profile } from "@/content/types";
import { CornerFrame } from "@/components/ui/corner-frame";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { MonoLabel } from "@/components/ui/mono-label";

function isTodo(value: string): boolean {
  return value.startsWith("TODO_");
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  if (isTodo(href)) {
    return (
      <span
        aria-disabled
        title="Lien à fournir"
        className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-muted opacity-50"
      >
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-[12px] uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text"
    >
      {label}
    </a>
  );
}

export function ContactSection({ profile }: { profile: Profile }) {
  const { contact } = profile;
  return (
    <section id="contact" className="relative overflow-hidden py-40 md:py-56">
      <Image
        src="/images/contact-texture.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="relative mx-auto max-w-xl px-6">
        <CornerFrame className="p-3">
          <LiquidGlass
            radius={28}
            contentClassName="flex flex-col items-center gap-8 px-8 py-12 text-center"
          >
            <MonoLabel>{profile.sections.contact.label}</MonoLabel>
            <p className="max-w-sm font-mono text-[14px] leading-[1.7] text-text-muted">
              {contact.intro}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="font-serif text-[clamp(1.4rem,3vw,2rem)] tracking-[-0.01em] text-text"
            >
              {contact.email}
            </a>
            <div className="flex items-center gap-8">
              <ExternalLink href={contact.github} label="GitHub" />
              <ExternalLink href={contact.linkedin} label="LinkedIn" />
            </div>
            {isTodo(contact.booking) ? (
              <span
                aria-disabled
                title="Lien à fournir"
                className="rounded-full border border-surface-border px-6 py-3 font-mono text-[12px] uppercase tracking-[0.08em] text-text-muted opacity-50"
              >
                {contact.bookingLabel}
              </span>
            ) : (
              <LiquidGlass
                href={contact.booking}
                radius={999}
                distortion={0}
                morph
                contentClassName="px-6 py-3 font-mono text-[12px] uppercase tracking-[0.08em] text-text"
              >
                {contact.bookingLabel}
              </LiquidGlass>
            )}
          </LiquidGlass>
        </CornerFrame>
      </div>
    </section>
  );
}
