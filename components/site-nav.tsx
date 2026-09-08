import type { Locale } from "@/content/types";
import { LiquidGlass } from "./ui/liquid-glass";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav({ locale }: { locale: Locale }) {
  return (
    <nav
      aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6"
    >
      <LiquidGlass
        radius={30}
        className="pointer-events-auto"
        contentClassName="flex h-[52px] items-center gap-2.5 px-3.5 sm:h-[56px] sm:gap-5 sm:px-6"
      >
        <a
          href={`/${locale}`}
          className="hidden font-mono text-[12px] uppercase tracking-[0.08em] text-text sm:inline"
        >
          Hugues Romain
        </a>
        <span
          aria-hidden
          className="hidden h-4 w-px shrink-0 bg-surface-border sm:block"
        />
        <ul className="flex items-center gap-2.5 sm:gap-5">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.06em] text-text-muted transition-colors hover:text-text sm:text-[11px] sm:tracking-[0.08em]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span aria-hidden className="h-4 w-px shrink-0 bg-surface-border" />
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitch locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </LiquidGlass>
    </nav>
  );
}
