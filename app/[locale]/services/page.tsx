import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OffersContent } from "@/components/home/offers";
import { getProfile, isLocale, LOCALES } from "@/content/get-profile";
import { localeAlternates, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { offers } = getProfile(locale);
  const title = `${offers.title} · Hugues Romain`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: offers.intro,
    alternates: {
      canonical: `/${locale}/services`,
      languages: localeAlternates("services"),
    },
    openGraph: {
      title,
      description: offers.intro,
      url: `/${locale}/services`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const profile = getProfile(locale);

  return (
    <div className="px-5 pt-24 pb-40 font-sans sm:px-6">
      <div className="mx-auto w-full max-w-[720px]">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>←</span>
          {locale === "fr" ? "Accueil" : "Home"}
        </Link>

        <header className="mt-10 flex flex-col gap-3">
          <h1 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-text sm:text-[32px]">
            {profile.offers.title}
          </h1>
          <p className="max-w-[60ch] text-[16px] leading-[1.65] text-text-muted">
            {profile.offers.intro}
          </p>
        </header>

        <div className="mt-10">
          <OffersContent profile={profile} />
        </div>
      </div>
    </div>
  );
}
