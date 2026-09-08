import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      alternates: {
        languages: { fr: `${SITE_URL}/fr`, en: `${SITE_URL}/en` },
      },
    },
    {
      url: `${SITE_URL}/fr`,
      lastModified: new Date(),
      alternates: {
        languages: { fr: `${SITE_URL}/fr`, en: `${SITE_URL}/en` },
      },
    },
  ];
}
