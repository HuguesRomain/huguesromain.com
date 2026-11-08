import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isLocale, LOCALES } from "@/content/get-profile";
import type { Locale } from "@/content/types";
import { JsonLd } from "@/components/seo/json-ld";
import { formatPostDate, getPost, getPosts } from "@/lib/blog";
import { blogPostingJsonLd } from "@/lib/json-ld";
import { localeAlternates, SITE_URL } from "@/lib/site";
import "@/app/blog-prose.css";

const STRINGS: Record<
  Locale,
  {
    back: string;
    readingTime: (minutes: number) => string;
    fallbackNotice: string;
  }
> = {
  fr: {
    back: "Blog",
    readingTime: (minutes) => `${minutes} min de lecture`,
    fallbackNotice:
      "Cet article n'est pas encore traduit en français. Version anglaise ci-dessous.",
  },
  en: {
    back: "Blog",
    readingTime: (minutes) => `${minutes} min read`,
    fallbackNotice:
      "This post is not translated to English yet. French version below.",
  },
};

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};
  const title = `${post.title} · Hugues Romain`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: localeAlternates(`blog/${slug}`),
    },
    openGraph: {
      title,
      description: post.description,
      url: `/${locale}/blog/${slug}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: post.date,
      authors: ["Hugues Romain"],
      tags: [...post.tags],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(locale, slug);
  if (!post) notFound();
  const strings = STRINGS[locale];

  return (
    <div className="px-6 pt-24 pb-28 font-sans">
      <JsonLd data={blogPostingJsonLd(locale, post)} />
      <div className="mx-auto w-full max-w-[680px]">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>←</span>
          {strings.back}
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-muted">
            <time dateTime={post.date}>
              {formatPostDate(post.date, locale)}
            </time>
            <span aria-hidden>·</span>
            <span>{strings.readingTime(post.readingMinutes)}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.15] tracking-tight text-text">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-text-muted">
            {post.description}
          </p>
          {post.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
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
        </header>

        {post.isFallback ? (
          <p className="mt-10 rounded-2xl bg-bg-panel px-5 py-4 text-sm text-text-muted">
            {strings.fallbackNotice}
          </p>
        ) : null}

        <article
          lang={post.contentLocale}
          className="blog-prose mt-12 border-t border-surface-border pt-12"
        >
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  );
}
