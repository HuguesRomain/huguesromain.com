"use client";

import { useSyncExternalStore } from "react";

const THEME_KEY = "preferred-theme";
const THEME_EVENT = "themechange";

type Theme = "dark" | "light";

function subscribe(callback: () => void): () => void {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  if (theme === "light") {
    document.documentElement.dataset.theme = "light";
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle({ locale }: { locale: "fr" | "en" }) {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label =
    locale === "fr"
      ? next === "light"
        ? "Passer en mode clair"
        : "Passer en mode sombre"
      : next === "light"
        ? "Switch to light mode"
        : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(next)}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-surface-border text-text-muted transition-colors hover:text-text"
    >
      <span aria-hidden className="font-mono text-[12px] leading-none">
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
