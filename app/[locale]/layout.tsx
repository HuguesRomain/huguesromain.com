import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { GlassFilter } from "@/components/ui/glass-filter";
import { SiteNav } from "@/components/site-nav";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      ? "Ingénieur full-stack, architecte IA freelance. Je crée et mets en production des workflows et des agents IA. Posez vos questions directement à une IA qui répond à sa place."
      : "Freelance full-stack engineer & AI architect. I design and ship AI workflows and agents. Ask your questions directly to an AI that answers on his behalf.";
  const title = `${profile.name} — ${
    locale === "fr"
      ? "Ingénieur full-stack, architecte IA"
      : "Full-stack engineer & AI architect"
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("preferred-theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}',
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <GlassFilter />
        <SiteNav locale={locale} />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
