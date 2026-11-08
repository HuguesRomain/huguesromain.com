import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogFrontmatter, BlogPost } from "@/content/blog-types";
import type { Locale } from "@/content/types";

// Blog hidden for now: flip to true to bring back the pages, nav link, home list, feed and sitemap entries.
export const BLOG_ENABLED = false;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

function parseFrontmatter(
  data: Record<string, unknown>,
  file: string,
): BlogFrontmatter {
  const { title, description, tags, published } = data;
  const date =
    data.date instanceof Date ? data.date.toISOString() : data.date;
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof date !== "string" ||
    Number.isNaN(Date.parse(date)) ||
    !Array.isArray(tags) ||
    !tags.every((tag): tag is string => typeof tag === "string") ||
    typeof published !== "boolean"
  ) {
    throw new Error(`Invalid blog frontmatter in ${file}`);
  }
  return { title, description, date, tags, published };
}

function loadPost(
  slug: string,
  contentLocale: Locale,
  requestedLocale: Locale,
): BlogPost | null {
  const fileName = `${slug}.${contentLocale}.mdx`;
  const filePath = path.join(BLOG_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const frontmatter = parseFrontmatter(data, fileName);
  const words = content.trim().split(/\s+/).length;
  return {
    ...frontmatter,
    slug,
    locale: requestedLocale,
    contentLocale,
    isFallback: contentLocale !== requestedLocale,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    content,
  };
}

function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const slugs = new Set<string>();
  for (const file of fs.readdirSync(BLOG_DIR)) {
    const match = /^(.+)\.(fr|en)\.mdx$/.exec(file);
    if (match) slugs.add(match[1]);
  }
  return [...slugs];
}

export function getPost(locale: Locale, slug: string): BlogPost | null {
  if (!BLOG_ENABLED) return null;
  const post =
    loadPost(slug, locale, locale) ??
    loadPost(slug, otherLocale(locale), locale);
  if (!post || !post.published) return null;
  return post;
}

export function getPosts(locale: Locale): BlogPost[] {
  return getAllSlugs()
    .map((slug) => getPost(locale, slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function formatPostDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
