import { notFound } from "next/navigation";
import { AiSection } from "@/components/home/ai-section";
import { BlogList } from "@/components/home/blog-list";
import { Contact } from "@/components/home/contact";
import { Contributions } from "@/components/home/contributions";
import { Intro } from "@/components/home/intro";
import { Projects } from "@/components/home/projects";
import { Stack } from "@/components/home/stack";
import { getProfile, isLocale } from "@/content/get-profile";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const profile = getProfile(locale);

  return (
    <div className="mx-auto flex w-full max-w-[680px] flex-col gap-16 px-6 pb-40 pt-16 sm:gap-20 sm:pt-24">
      <Intro profile={profile} />
      <AiSection profile={profile} />
      <Projects profile={profile} />
      <Contributions locale={locale} />
      <BlogList locale={locale} />
      <Stack profile={profile} />
      <Contact profile={profile} />
      <footer>
        <p className="text-[12px] text-text-muted">
          © {new Date().getFullYear()} Hugues Romain
        </p>
      </footer>
    </div>
  );
}
