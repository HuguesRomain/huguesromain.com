import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrbiShowcase } from "@/components/home/orbi-showcase";
import { ProjectIconMark } from "@/components/home/project-card";
import {
  experienceHref,
  getExperienceExtras,
  getProject,
  getProjectSlugs,
  isClientSlug,
  isVentureSlug,
} from "@/content/experience";
import { JsonLd } from "@/components/seo/json-ld";
import { isLocale, LOCALES } from "@/content/get-profile";
import type { Locale } from "@/content/types";
import { experienceJsonLd } from "@/lib/json-ld";
import { localeAlternates, SITE_URL } from "@/lib/site";

const STRINGS: Record<
  Locale,
  { clients: string; experience: string; ventures: string }
> = {
  fr: {
    clients: "Clients",
    experience: "Expérience en entreprise",
    ventures: "Entrepreneuriat",
  },
  en: {
    clients: "Clients",
    experience: "Company experience",
    ventures: "Entrepreneurship",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experience/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};
  const title = `${project.title} · Hugues Romain`;
  const path = experienceHref(locale, slug);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: project.context,
    alternates: {
      canonical: path,
      languages: localeAlternates(`experience/${slug}`),
    },
    openGraph: {
      title,
      description: project.context,
      url: path,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.context,
    },
  };
}

export default async function ExperiencePage({
  params,
}: PageProps<"/[locale]/experience/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(locale, slug);
  if (!project) notFound();
  const strings = STRINGS[locale];
  const extras = getExperienceExtras(locale, slug);
  const path = experienceHref(locale, slug);
  const backLabel = isVentureSlug(slug)
    ? strings.ventures
    : isClientSlug(slug)
      ? strings.clients
      : strings.experience;
  const backHref = isVentureSlug(slug)
    ? `/${locale}#entrepreneuriat`
    : isClientSlug(slug)
      ? `/${locale}#clients`
      : `/${locale}#experience`;

  return (
    <div className="px-5 pt-24 pb-28 font-sans sm:px-6">
      <JsonLd data={experienceJsonLd(locale, project, path)} />
      <div className="mx-auto w-full max-w-[720px]">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>←</span>
          {backLabel}
        </Link>

        <header className="mt-10 flex items-start gap-4 sm:gap-5">
          <ProjectIconMark slug={project.slug} size="detail" />
          <div className="min-w-0 flex-1">
            <h1 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-text sm:text-[32px]">
              {project.title}
            </h1>
            <p className="mt-1.5 text-[15px] font-medium text-text-muted">
              {project.role}
            </p>
            <p className="mt-1 text-[13px] text-text-muted">{project.period}</p>
          </div>
        </header>

        <div className="mt-10 flex flex-col gap-5">
          <p className="text-[16px] leading-[1.65] text-text">
            {project.context}
          </p>
          {extras.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[16px] leading-[1.65] text-text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {slug === "orbi" ? <OrbiShowcase locale={locale} /> : null}

        <ul className="mt-10 flex flex-col gap-3.5 border-t border-surface-border pt-10">
          {project.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-3 text-[15px] leading-[1.6] text-text"
            >
              <span
                aria-hidden
                className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
