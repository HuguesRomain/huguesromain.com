"use client";

import { useSyncExternalStore } from "react";

const THEME_KEY = "preferred-theme";
const THEME_EVENT = "themechange";

type Theme = "light" | "dark";

function subscribe(callback: () => void): () => void {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.dataset.theme = "dark";
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle({ locale }: { locale: "fr" | "en" }) {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "light");
  const next: Theme = theme === "light" ? "dark" : "light";
  const label =
    locale === "fr"
      ? next === "dark"
        ? "Passer en mode sombre"
        : "Passer en mode clair"
      : next === "dark"
        ? "Switch to dark mode"
        : "Switch to light mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(next)}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-surface-border text-text-muted transition-colors hover:text-text"
    >
      <span aria-hidden className="text-[12px] leading-none">
        {theme === "light" ? "☾" : "☀"}
      </span>
    </button>
  );
}
