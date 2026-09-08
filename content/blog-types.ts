import type { Locale } from "./types";

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: readonly string[];
  published: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  locale: Locale;
  contentLocale: Locale;
  isFallback: boolean;
  readingMinutes: number;
  content: string;
}
