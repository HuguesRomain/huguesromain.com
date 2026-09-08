import { profileEn } from "./profile.en";
import { profileFr } from "./profile.fr";
import type { Locale, Profile } from "./types";

export const LOCALES: readonly Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return value === "fr" || value === "en";
}

export function getProfile(locale: Locale): Profile {
  return locale === "fr" ? profileFr : profileEn;
}
