import type { Profile } from "@/content/types";
import {
  getStackIcon,
  getStackInitial,
} from "@/components/sections/stack-icons";
import { Card } from "./card";
import { Section } from "./section";

function StackChip({ item }: { item: string }) {
  const icon = getStackIcon(item);
  return (
    <span className="group inline-flex cursor-default items-center gap-1.5 rounded-full border border-surface-border px-3 py-1.5 transition-colors duration-200 hover:border-accent">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-[13px] shrink-0 fill-text-muted transition-colors duration-200 group-hover:fill-accent"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className="flex size-[13px] shrink-0 items-center justify-center rounded-[3px] border border-text-muted/50 text-[8px] leading-none text-text-muted transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
        >
          {getStackInitial(item)}
        </span>
      )}
      <span className="text-[13px] text-text">{item}</span>
    </span>
  );
}

export function Stack({ profile }: { profile: Profile }) {
  return (
    <Section id="stack" title="Stack">
      <Card className="flex flex-col gap-5 p-6 sm:p-7">
        {profile.stack.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <p className="text-[12px] font-medium text-text-muted">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <StackChip key={item} item={item} />
              ))}
            </div>
          </div>
        ))}
      </Card>
    </Section>
  );
}
