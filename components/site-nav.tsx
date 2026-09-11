import type { Locale } from "@/content/types";
import { LiquidGlass } from "./ui/liquid-glass";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

const LINKS = (locale: Locale) =>
  [
    { href: `/${locale}#experience`, label: locale === "fr" ? "Expérience" : "Experience" },
    { href: `/${locale}#entrepreneuriat`, label: "Studio" },
    { href: `/${locale}#stack`, label: "Stack" },
    { href: `/${locale}/blog`, label: "Blog" },
    { href: `/${locale}#contact`, label: "Contact" },
  ] as const;

export function SiteNav({ locale }: { locale: Locale }) {
  return (
    <nav
      data-site-nav
      aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6"
    >
      <LiquidGlass
        radius={30}
        className="pointer-events-auto"
        contentClassName="flex h-[52px] items-center gap-3 px-4 sm:h-[56px] sm:gap-5 sm:px-6"
      >
        <a
          href={`/${locale}`}
          className="hidden text-[13px] font-semibold tracking-[-0.01em] text-text sm:inline"
        >
          Hugues Romain
        </a>
        <span
          aria-hidden
          className="hidden h-4 w-px shrink-0 bg-surface-border sm:block"
        />
        <ul className="flex items-center gap-3 sm:gap-4">
          {LINKS(locale).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] font-medium text-text-muted transition-colors hover:text-text"
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
