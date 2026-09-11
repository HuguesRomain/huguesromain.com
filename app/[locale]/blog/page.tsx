import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/content/get-profile";
import type { Locale } from "@/content/types";
import { formatPostDate, getPosts } from "@/lib/blog";
import { localeAlternates, SITE_URL } from "@/lib/site";

const STRINGS: Record<
  Locale,
  {
    label: string;
    title: string;
    description: string;
    empty: string;
    readingTime: (minutes: number) => string;
    fallbackNotice: string;
  }
> = {
  fr: {
    label: "Blog",
    title: "Notes d'ingénierie",
    description:
      "Agents IA en production, architecture full-stack, retours d'expérience concrets.",
    empty: "Aucun article pour le moment.",
    readingTime: (minutes) => `${minutes} min de lecture`,
    fallbackNotice: "En anglais",
  },
  en: {
    label: "Blog",
    title: "Engineering notes",
    description:
      "AI agents in production, full-stack architecture, hands-on lessons from the field.",
    empty: "No posts yet.",
    readingTime: (minutes) => `${minutes} min read`,
    fallbackNotice: "In French",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const strings = STRINGS[locale];
  const title = `${strings.label} — Hugues Romain`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: strings.description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: localeAlternates("blog"),
    },
    openGraph: {
      title,
      description: strings.description,
      url: `/${locale}/blog`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const strings = STRINGS[locale];
  const posts = getPosts(locale);

  return (
    <section className="px-6 pt-24 pb-28 font-sans">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-sm font-medium text-accent">{strings.label}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text">
          {strings.title}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-text-muted">
          {strings.description}
        </p>

        {posts.length === 0 ? (
          <p className="mt-14 text-text-muted">{strings.empty}</p>
        ) : (
          <ul className="mt-14 flex flex-col gap-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="group block rounded-[28px] bg-bg-panel p-8 transition-transform duration-300 ease-out hover:-translate-y-0.5"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-muted">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date, locale)}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{strings.readingTime(post.readingMinutes)}</span>
                    {post.isFallback ? (
                      <>
                        <span aria-hidden>·</span>
                        <span>{strings.fallbackNotice}</span>
                      </>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-muted">
                    {post.description}
                  </p>
                  {post.tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-surface-border px-3 py-1 text-xs text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
