import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/content/experience";
import { LOCALES } from "@/content/get-profile";
import { getPosts } from "@/lib/blog";
import { CONTENT_UPDATED, localeAlternateUrls, SITE_URL } from "@/lib/site";

const SITE_MODIFIED = new Date(CONTENT_UPDATED);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: SITE_MODIFIED,
      alternates: { languages: localeAlternateUrls("") },
    },
    {
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: SITE_MODIFIED,
      alternates: { languages: localeAlternateUrls("blog") },
    },
  ]);

  for (const locale of LOCALES) {
    for (const slug of getProjectSlugs()) {
      entries.push({
        url: `${SITE_URL}/${locale}/experience/${slug}`,
        lastModified: SITE_MODIFIED,
        alternates: {
          languages: localeAlternateUrls(`experience/${slug}`),
        },
      });
    }
  }

  for (const locale of LOCALES) {
    for (const post of getPosts(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        alternates: {
          languages: localeAlternateUrls(`blog/${post.slug}`),
        },
      });
    }
  }

  for (const locale of [...LOCALES, "zh"]) {
    for (const page of ["conditions", "confidentialite", "support"]) {
      entries.push({
        url: `${SITE_URL}/${locale}/recto/${page}`,
        lastModified: new Date("2026-11-05"),
        alternates: {
          languages: {
            ...localeAlternateUrls(`recto/${page}`),
            "zh-Hans": `${SITE_URL}/zh/recto/${page}`,
          },
        },
      });
    }
  }

  return entries;
}