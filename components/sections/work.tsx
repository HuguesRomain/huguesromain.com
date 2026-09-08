import type { Profile } from "@/content/types";
import { SectionHeader } from "./section-header";
import { WorkCard } from "./work-card";

export function WorkSection({ profile }: { profile: Profile }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeader
        label={profile.sections.work.label}
        title={profile.sections.work.title}
      />
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {profile.projects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
