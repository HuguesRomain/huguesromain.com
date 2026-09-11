import Link from "next/link";
import { getFaqItems } from "@/content/faq";
import type { Locale } from "@/content/types";
import { Section } from "./section";

export function Faq({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const items = getFaqItems(locale);
  return (
    <Section id="faq" title="FAQ">
      <dl className="flex flex-col gap-6">
        {items.map((item) => (
          <div key={item.question} className="flex flex-col gap-2">
            <dt className="text-[15px] font-medium tracking-[-0.01em] text-text">
              {item.question}
            </dt>
            <dd className="text-[15px] leading-[1.65] text-text-muted">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-[13px] text-text-muted">
        {fr ? (
          <>
            Plus de détail sur{" "}
            <Link
              href={`/${locale}/experience/aiorigin`}
              className="underline decoration-surface-border underline-offset-4 hover:text-text hover:decoration-accent"
            >
              aiOrigin
            </Link>
            ,{" "}
            <Link
              href={`/${locale}/experience/axiome`}
              className="underline decoration-surface-border underline-offset-4 hover:text-text hover:decoration-accent"
            >
              Axiome App Studio
            </Link>{" "}
            et le{" "}
            <Link
              href={`/${locale}/blog`}
              className="underline decoration-surface-border underline-offset-4 hover:text-text hover:decoration-accent"
            >
              blog
            </Link>
            .
          </>
        ) : (
          <>
            More on{" "}
            <Link
              href={`/${locale}/experience/aiorigin`}
              className="underline decoration-surface-border underline-offset-4 hover:text-text hover:decoration-accent"
            >
              aiOrigin
            </Link>
            ,{" "}
            <Link
              href={`/${locale}/experience/axiome`}
              className="underline decoration-surface-border underline-offset-4 hover:text-text hover:decoration-accent"
            >
              Axiome App Studio
            </Link>{" "}
            and the{" "}
            <Link
              href={`/${locale}/blog`}
              className="underline decoration-surface-border underline-offset-4 hover:text-text hover:decoration-accent"
            >
              blog
            </Link>
            .
          </>
        )}
      </p>
    </Section>
  );
}
