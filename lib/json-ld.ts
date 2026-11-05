import type { Project } from "@/content/types";
import type { BlogPost } from "@/content/blog-types";
import type { Locale } from "@/content/types";
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON_ID,
  PERSON_NAME,
  SITE_URL,
} from "@/lib/site";

const PORTRAIT = `${SITE_URL}/images/portrait.webp`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    url: SITE_URL,
    image: PORTRAIT,
    email: CONTACT_EMAIL,
    jobTitle: "Software engineer & AI architect",
    description:
      "Freelance software engineer and AI architect based in Nice, France. Designs and ships AI workflows and agents, and builds web and mobile products end to end.",
    knowsLanguage: ["fr", "en"],
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL",
      "AI agents",
      "React",
      "Next.js",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nice",
      addressCountry: "FR",
    },
    sameAs: [GITHUB_URL, LINKEDIN_URL, CALENDLY_URL],
    founder: [
      {
        "@type": "Organization",
        name: "Axiome",
        url: `${SITE_URL}/en/experience/axiome`,
      },
      {
        "@type": "Organization",
        name: "aiOrigin",
        url: `${SITE_URL}/en/experience/aiorigin`,
      },
    ],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: PERSON_NAME,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    publisher: { "@id": PERSON_ID },
  };
}

export function homeJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [personJsonLd(), websiteJsonLd(locale)],
  };
}

export function blogPostingJsonLd(locale: Locale, post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: post.contentLocale === "fr" ? "fr-FR" : "en-US",
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        mainEntityOfPage: `${SITE_URL}/${locale}/blog/${post.slug}`,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        image: `${SITE_URL}/${locale}/opengraph-image`,
      },
    ],
  };
}

export function experienceJsonLd(
  locale: Locale,
  project: Project,
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.context,
        url: `${SITE_URL}${path}`,
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
      },
    ],
  };
}
