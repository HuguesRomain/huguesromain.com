import Link from "next/link";
import type { Locale } from "@/content/types";
import { formatPostDate, getPosts } from "@/lib/blog";
import { BentoCard, CardLabel } from "./card";

export function BlogCard({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const posts = getPosts(locale).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <BentoCard className="col-span-6 lg:col-span-2">
      <div className="flex h-full flex-col gap-6 p-7">
        <div className="flex items-baseline justify-between gap-4">
          <CardLabel>Blog</CardLabel>
          <Link
            href={`/${locale}/blog`}
            className="text-[13px] text-text-muted transition-colors hover:text-text"
          >
            {fr ? "Tout voir" : "View all"} →
          </Link>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-5">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="text-[12px] text-text-muted">
                  {formatPostDate(post.date, locale)}
                </span>
                <span className="text-[15px] font-medium leading-[1.35] text-text transition-colors group-hover:text-accent">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
}
