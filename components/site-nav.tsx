import type { Locale } from "@/content/types";
import { LocaleSwitch } from "./locale-switch";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface backdrop-blur-md">
      <nav
        aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a
          href={`/${locale}`}
          className="font-mono text-[12px] uppercase tracking-[0.08em] text-text"
        >
          Hugues Romain
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 sm:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LocaleSwitch locale={locale} />
        </div>
      </nav>
    </header>
  );
}
