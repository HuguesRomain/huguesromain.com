"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Profile } from "@/content/types";
import { SectionHeader } from "./section-header";
import { getStackIcon, getStackInitial } from "./stack-icons";

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function StackChip({ item }: { item: string }) {
  const icon = getStackIcon(item);
  return (
    <span className="group inline-flex cursor-default items-center gap-2 rounded-full border border-grid-line bg-transparent py-1.5 pl-3 pr-3.5 transition-colors duration-200 hover:border-accent">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-[15px] shrink-0 fill-text transition-[fill,transform] duration-200 group-hover:scale-110 group-hover:fill-accent"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className="flex size-[15px] shrink-0 items-center justify-center rounded-[3px] border border-text/50 font-mono text-[8px] leading-none text-text transition-[border-color,color,transform] duration-200 group-hover:scale-110 group-hover:border-accent group-hover:text-accent"
        >
          {getStackInitial(item)}
        </span>
      )}
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted transition-colors duration-200 group-hover:text-accent">
        {item}
      </span>
    </span>
  );
}

export function StackSection({ profile }: { profile: Profile }) {
  const reducedMotion = useReducedMotion();
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-32 md:py-44">
      <SectionHeader
        label={profile.sections.stack.label}
        title={profile.sections.stack.title}
      />
      <dl className="mt-16 flex flex-col gap-10">
        {profile.stack.map((group) => (
          <div
            key={group.label}
            className="flex flex-col gap-3 md:flex-row md:gap-4"
          >
            <dt className="shrink-0 pt-[7px] font-mono text-[12px] uppercase tracking-[0.08em] text-text md:w-44">
              {group.label}
            </dt>
            <motion.dd
              className="flex flex-1 flex-wrap gap-2"
              variants={reducedMotion ? undefined : listVariants}
              initial={reducedMotion ? undefined : "hidden"}
              whileInView={reducedMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
            >
              {group.items.map((item) =>
                reducedMotion ? (
                  <StackChip key={item} item={item} />
                ) : (
                  <motion.span key={item} variants={chipVariants}>
                    <StackChip item={item} />
                  </motion.span>
                ),
              )}
            </motion.dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
