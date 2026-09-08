import type { Profile } from "@/content/types";
import { SectionHeader } from "./section-header";

export function StackSection({ profile }: { profile: Profile }) {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeader
        label={profile.sections.stack.label}
        title={profile.sections.stack.title}
      />
      <dl className="mt-16 flex flex-col gap-8">
        {profile.stack.map((group) => (
          <div
            key={group.label}
            className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4"
          >
            <dt className="shrink-0 font-mono text-[12px] uppercase tracking-[0.08em] text-text md:w-44">
              {group.label}
            </dt>
            <span
              aria-hidden
              className="hidden flex-1 -translate-y-[3px] border-b border-dotted border-grid-line md:block"
            />
            <dd className="max-w-xl font-mono text-[12px] uppercase leading-[1.9] tracking-[0.08em] text-text-muted md:text-right">
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
