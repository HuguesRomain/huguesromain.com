"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/types";

const LOCALE_COOKIE = "preferred-locale";

function persist(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {}
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function hrefForLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  if (segments.length > 1) {
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }
  return `/${locale}`;
}

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <span className="flex items-center gap-2 text-[12px] font-medium">
      {(["fr", "en"] as const).map((candidate, index) => (
        <span key={candidate} className="flex items-center gap-2">
          {index > 0 ? (
            <span aria-hidden className="text-text-muted opacity-50">
              /
            </span>
          ) : null}
          {candidate === locale ? (
            <span aria-current="true" className="text-text">
              {candidate.toUpperCase()}
            </span>
          ) : (
            <Link
              href={hrefForLocale(pathname, candidate)}
              onClick={() => persist(candidate)}
              className="text-text-muted transition-colors hover:text-text"
            >
              {candidate.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
