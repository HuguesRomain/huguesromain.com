import type { Profile } from "@/content/types";
import {
  getStackIcon,
  getStackInitial,
} from "@/components/sections/stack-icons";
import { BentoCard, CardLabel } from "./card";

function StackChip({ item }: { item: string }) {
  const icon = getStackIcon(item);
  return (
    <span className="group inline-flex cursor-default items-center gap-2 rounded-full border border-surface-border bg-surface px-3 py-1.5 transition-colors duration-200 hover:border-accent">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-[14px] shrink-0 fill-text-muted transition-colors duration-200 group-hover:fill-accent"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className="flex size-[14px] shrink-0 items-center justify-center rounded-[3px] border border-text-muted/50 text-[8px] leading-none text-text-muted transition-colors duration-200 group-hover:border-accent group-hover:text-accent"
        >
          {getStackInitial(item)}
        </span>
      )}
      <span className="text-[13px] text-text transition-colors duration-200">
        {item}
      </span>
    </span>
  );
}

export function StackCard({ profile }: { profile: Profile }) {
  const fr = profile.locale === "fr";
  return (
    <BentoCard id="stack" className="col-span-6 lg:col-span-4">
      <div className="flex h-full flex-col gap-6 p-7">
        <CardLabel>{fr ? "Stack" : "Stack"}</CardLabel>
        <div className="flex flex-col gap-5">
          {profile.stack.map((group) => (
            <div key={group.label} className="flex flex-col gap-2.5">
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
        </div>
      </div>
    </BentoCard>
  );
}
