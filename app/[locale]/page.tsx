import { notFound } from "next/navigation";
import { AiCard } from "@/components/bento/ai-card";
import { ClientsCard } from "@/components/bento/clients-card";
import { ContactCard } from "@/components/bento/contact-card";
import { ContributionsCard } from "@/components/bento/contributions-card";
import { IntroCard } from "@/components/bento/intro-card";
import { ProjectCard } from "@/components/bento/project-card";
import { StackCard } from "@/components/bento/stack-card";
import { StatusCard } from "@/components/bento/status-card";
import { getProfile, isLocale } from "@/content/get-profile";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const profile = getProfile(locale);

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-36 pt-10 sm:px-6 sm:pt-14">
      <div className="grid grid-cols-6 gap-4">
        <IntroCard profile={profile} />
        <StatusCard profile={profile} />
        <AiCard profile={profile} />
        <div id="projects" className="col-span-6 grid grid-cols-6 gap-4">
          {profile.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <ContributionsCard locale={locale} />
        <ClientsCard locale={locale} />
        <StackCard profile={profile} />
        <ContactCard profile={profile} />
      </div>
      <footer className="pt-10">
        <p className="text-center text-[12px] text-text-muted">
          © {new Date().getFullYear()} Hugues Romain
        </p>
      </footer>
    </div>
  );
}
