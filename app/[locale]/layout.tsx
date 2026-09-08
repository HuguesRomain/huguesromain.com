import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { GlassFilter } from "@/components/ui/glass-filter";
import { GridLines } from "@/components/ui/grid-lines";
import { SiteNav } from "@/components/site-nav";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const profile = getProfile(locale);
  const description =
    locale === "fr"
      ? "Ingénieur full-stack & IA freelance. Posez vos questions directement à une IA qui répond à sa place."
      : "Freelance full-stack & AI engineer. Ask your questions directly to an AI that answers on his behalf.";
  return {
    title: `${profile.name} — ${
      locale === "fr" ? "Ingénieur full-stack & IA" : "Full-stack & AI engineer"
    }`,
    description,
    alternates: {
      languages: { fr: "/fr", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-mono text-text">
        <GlassFilter />
        <GridLines />
        <SiteNav locale={locale} />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
