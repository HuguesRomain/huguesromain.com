import { notFound } from "next/navigation";
import { BlogList } from "@/components/home/blog-list";
import { Clients } from "@/components/home/clients";
import { CompanyExperience } from "@/components/home/company-experience";
import { Contact } from "@/components/home/contact";
import { Contributions } from "@/components/home/contributions";
import { Entrepreneurship } from "@/components/home/entrepreneurship";
import { Intro } from "@/components/home/intro";
import { Stack } from "@/components/home/stack";
import { JsonLd } from "@/components/seo/json-ld";
import { getProfile, isLocale } from "@/content/get-profile";
import { homeJsonLd } from "@/lib/json-ld";

const FOOTER_ASCII = `    .:.
   :=+=:
  :#   #:
 :#     #:
:#=======#:`;

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const profile = getProfile(locale);

  return (
    <div className="mx-auto flex w-full max-w-[760px] flex-col gap-14 px-5 pb-40 pt-16 sm:gap-16 sm:px-6 sm:pt-24">
      <JsonLd data={homeJsonLd(locale)} />
      <Intro profile={profile} />
      <Clients profile={profile} />
      <CompanyExperience profile={profile} />
      <Entrepreneurship profile={profile} />
      <Stack profile={profile} />
      <Contributions locale={locale} />
      <BlogList locale={locale} />
      <Contact profile={profile} />
      <footer className="flex items-end justify-between gap-6">
        <p className="text-[12px] text-text-muted">
          © {new Date().getFullYear()} Hugues Romain
        </p>
        <pre
          aria-hidden="true"
          className="select-none font-mono text-[10px] leading-[1.05] text-text-muted opacity-70"
        >
          {FOOTER_ASCII}
        </pre>
      </footer>
    </div>
  );
}
