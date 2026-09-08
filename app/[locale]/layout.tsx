import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { GlassFilter } from "@/components/ui/glass-filter";
import { SiteNav } from "@/components/site-nav";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";
import { SITE_URL } from "@/lib/site";

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
  const title = `${profile.name} — ${
    locale === "fr" ? "Ingénieur full-stack & IA" : "Full-stack & AI engineer"
  }`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: profile.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("preferred-theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}',
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-mono text-text">
        <GlassFilter />
        <SiteNav locale={locale} />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
