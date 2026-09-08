import Link from "next/link";
import type { Locale } from "@/content/types";
import { formatPostDate, getPosts } from "@/lib/blog";
import { Section } from "./section";

export function BlogList({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const posts = getPosts(locale).slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <Section
      id="blog"
      title="Blog"
      action={
        <Link
          href={`/${locale}/blog`}
          className="text-[13px] text-text-muted transition-colors hover:text-text"
        >
          {fr ? "Tout voir" : "View all"} →
        </Link>
      }
    >
      <ul className="flex flex-col gap-1">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="group -mx-3 flex flex-col gap-1 rounded-2xl px-3 py-3 transition-colors hover:bg-surface sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span className="text-[15px] font-medium leading-[1.4] tracking-[-0.01em] text-text transition-colors group-hover:text-accent">
                {post.title}
              </span>
              <span className="shrink-0 text-[12px] text-text-muted">
                {formatPostDate(post.date, locale)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
