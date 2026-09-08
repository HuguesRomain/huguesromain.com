const PRODUCTION_URL = "https://huguesromain.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000");
