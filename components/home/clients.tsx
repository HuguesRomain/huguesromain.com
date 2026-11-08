import { getClientProjects } from "@/content/experience";
import type { Profile } from "@/content/types";
import { ProjectCard } from "./project-card";
import { Section } from "./section";

export function Clients({ profile }: { profile: Profile }) {
  return (
    <Section id="clients" title="Clients">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {getClientProjects(profile).map((project) => (
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
