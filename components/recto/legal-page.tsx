import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/site";

const LINKS = [
  { path: "conditions", label: "Conditions" },
  { path: "confidentialite", label: "Confidentialité" },
  { path: "support", label: "Support" },
];

export function rectoMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} — Recto AI`,
    description,
    alternates: { canonical: `/fr/recto/${path}` },
  };
}

// Recto is French only in V1, so the English route points to the French page.
export function requireFrench(locale: string, path: string) {
  if (locale !== "fr") redirect(`/fr/recto/${path}`);
}

export function LegalPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <section className="px-6 pt-24 pb-28 font-sans">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-medium text-accent">Recto AI</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text">
          {title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text-muted">{intro}</p>
        {updated ? (
          <p className="mt-3 text-[13px] text-text-muted">
            Dernière mise à jour : {updated}
          </p>
        ) : null}
        <div className="mt-12 flex flex-col gap-10">{children}</div>
        <nav
          aria-label="Documents Recto AI"
          className="mt-14 flex flex-wrap gap-5 border-t border-surface-border pt-6 text-sm"
        >
          {LINKS.map((link) => (
            <Link
              key={link.path}
              href={`/fr/recto/${link.path}`}
              className="text-text-muted transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-text">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-[15px] leading-relaxed text-text-muted [&_a]:text-text [&_a]:underline [&_strong]:font-medium [&_strong]:text-text [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
