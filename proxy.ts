import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["fr", "en"] as const;
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE = "preferred-locale";
const CRAWLER =
  /Googlebot|Google-Extended|Bingbot|GPTBot|ClaudeBot|PerplexityBot|anthropic-ai|CCBot|Amazonbot|Bytespider|Applebot/i;

function pickLocale(request: NextRequest): string {
  const ua = request.headers.get("user-agent") ?? "";
  if (CRAWLER.test(ua)) return DEFAULT_LOCALE;
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) return cookie;
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0]?.trim().slice(0, 2).toLowerCase();
    if (code && (LOCALES as readonly string[]).includes(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  // Chinese only exists for the Recto pages, so it is not a site-wide locale.
  if (hasLocale || pathname.startsWith("/zh/recto/")) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)"],
};