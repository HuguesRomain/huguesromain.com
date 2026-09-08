import type { MetadataRoute } from "next";
import { LOCALES } from "@/content/get-profile";
import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      alternates: {
        languages: { fr: `${SITE_URL}/fr`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          fr: `${SITE_URL}/fr/blog`,
          en: `${SITE_URL}/en/blog`,
        },
      },
    },
  ]);

  for (const locale of LOCALES) {
    for (const post of getPosts(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        alternates: {
          languages: {
            fr: `${SITE_URL}/fr/blog/${post.slug}`,
            en: `${SITE_URL}/en/blog/${post.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
