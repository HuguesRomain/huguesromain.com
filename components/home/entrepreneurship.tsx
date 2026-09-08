import { getVentureProjects } from "@/content/experience";
import type { Profile } from "@/content/types";
import { ProjectCard } from "./project-card";
import { Section } from "./section";

export function Entrepreneurship({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  return (
    <Section
      id="entrepreneuriat"
      title={fr ? "Entrepreneuriat" : "Entrepreneurship"}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {getVentureProjects(profile).map((project) => (
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
