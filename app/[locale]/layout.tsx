import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { GlassFilter } from "@/components/ui/glass-filter";
import { SiteNav } from "@/components/site-nav";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";
import { localeAlternates, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
};

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
      ? "Hugues Romain, ingénieur logiciel et architecte IA freelance à Nice. Workflows et agents IA, produits web et mobile de bout en bout."
      : "Hugues Romain, freelance software engineer and AI architect in Nice. I design and ship AI workflows and agents, and build web and mobile products end to end.";
  const title = `${profile.name} — ${
    locale === "fr"
      ? "Ingénieur logiciel, architecte IA"
      : "Software engineer & AI architect"
  }`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: localeAlternates(""),
      types: {
        "application/rss+xml": `/${locale}/feed.xml`,
      },
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
