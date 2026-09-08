"use client";

import Link from "next/link";
import type { Locale } from "@/content/types";

const LOCALE_COOKIE = "preferred-locale";

function persist(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {}
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleSwitch({ locale }: { locale: Locale }) {
  return (
    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
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
              href={`/${candidate}`}
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
