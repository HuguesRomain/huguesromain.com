import { getExperienceProjects } from "@/content/experience";
import type { Profile } from "@/content/types";
import { ProjectCard } from "./project-card";
import { Section } from "./section";

export function Projects({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  return (
    <Section id="experience" title={fr ? "Expérience" : "Experience"}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {getExperienceProjects(profile).map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={profile.locale}
          />
        ))}
      </div>
    </Section>
  );
}
