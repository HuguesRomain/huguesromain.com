import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import { localeAlternates, SITE_URL } from "@/lib/site";

// Chinese only exists for these Recto pages, so it stays out of the site's Locale type.
type LegalLocale = Locale | "zh";

const LINKS = [
  { path: "conditions", label: { fr: "Conditions", en: "Terms", zh: "条款" } },
  {
    path: "confidentialite",
    label: { fr: "Confidentialité", en: "Privacy", zh: "隐私" },
  },
  { path: "support", label: { fr: "Support", en: "Support", zh: "支持" } },
];

const LABELS = {
  fr: { updated: "Dernière mise à jour :", nav: "Documents Recto AI" },
  en: { updated: "Last updated:", nav: "Recto AI documents" },
  zh: { updated: "最后更新", nav: "Recto AI 文件" },
};

export function rectoMetadata(
  locale: LegalLocale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} · Recto AI`,
    description,
    alternates: {
      canonical: `/${locale}/recto/${path}`,
      languages: {
        ...localeAlternates(`recto/${path}`),
        "zh-Hans": `/zh/recto/${path}`,
      },
    },
  };
}

export function LegalPage({
  locale,
  title,
  intro,
  updated,
  children,
}: {
  locale: LegalLocale;
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
            {LABELS[locale].updated} {updated}
          </p>
        ) : null}
        <div className="mt-12 flex flex-col gap-10">{children}</div>
        <nav
          aria-label={LABELS[locale].nav}
          className="mt-14 flex flex-wrap gap-5 border-t border-surface-border pt-6 text-sm"
        >
          {LINKS.map((link) => (
            <Link
              key={link.path}
              href={`/${locale}/recto/${link.path}`}
              className="text-text-muted transition-colors hover:text-text"
            >
              {link.label[locale]}
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
