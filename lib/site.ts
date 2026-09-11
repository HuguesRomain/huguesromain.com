const PRODUCTION_URL = "https://huguesromain.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000");

export const PERSON_NAME = "Hugues Romain";
export const PERSON_ID = `${PRODUCTION_URL}/#hugues-romain`;
export const CONTACT_EMAIL = "huguesromaindev@gmail.com";
export const GITHUB_URL = "https://github.com/HuguesRomain";
export const LINKEDIN_URL = "https://www.linkedin.com/in/huguesromain/";
export const CALENDLY_URL = "https://calendly.com/huguesromain";
export const CONTENT_UPDATED = "2026-09-10";

export function localeAlternates(pathAfterLocale: string) {
  const suffix = pathAfterLocale ? `/${pathAfterLocale.replace(/^\//, "")}` : "";
  return {
    fr: `/fr${suffix}`,
    en: `/en${suffix}`,
    "x-default": `/en${suffix}`,
  };
}

export function localeAlternateUrls(pathAfterLocale: string) {
  const suffix = pathAfterLocale ? `/${pathAfterLocale.replace(/^\//, "")}` : "";
  return {
    fr: `${SITE_URL}/fr${suffix}`,
    en: `${SITE_URL}/en${suffix}`,
    "x-default": `${SITE_URL}/en${suffix}`,
  };
}
