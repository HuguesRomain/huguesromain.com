import Image from "next/image";
import type { Locale } from "@/content/types";
import { Card } from "./card";

const SITE_URL = "https://www.get-orbi.com";

type Block = { title: string; text: string };

const COPY: Record<
  Locale,
  {
    heroTitle: string;
    heroText: string;
    cta: string;
    assistants: string;
    moodsLabel: string;
    moods: readonly { file: string; label: string }[];
    howLabel: string;
    steps: readonly Block[];
    sections: readonly { label: string; blocks: readonly Block[] }[];
  }
> = {
  fr: {
    heroTitle: "Le coach qui vit dans les assistants IA",
    heroText:
      "Les équipes ont l'IA, mais peu savent bien s'en servir. Les bonnes méthodes restent dans la tête de quelques power users, et les formations s'oublient en deux semaines. Orbi coache chacun au moment où il écrit à son assistant, puis transforme les meilleures méthodes en skills partagés.",
    cta: "Voir get-orbi.com",
    assistants: "Claude · ChatGPT · Copilot · Cursor",
    moodsLabel: "La mascotte et ses humeurs",
    moods: [
      { file: "orbi-neutral", label: "Neutre" },
      { file: "orbi-happy", label: "Contente" },
      { file: "orbi-thinking", label: "Pensive" },
      { file: "orbi-worried", label: "Inquiète" },
    ],
    howLabel: "Comment ça marche",
    steps: [
      {
        title: "Dans ton assistant IA",
        text: "Orbi se connecte en quelques minutes et n'intervient que quand un prompt peut vraiment être amélioré.",
      },
      {
        title: "Un coaching au bon moment",
        text: "Un conseil court, une meilleure formulation et de l'XP. L'XP récompense les bons usages, jamais le volume.",
      },
      {
        title: "Des méthodes partagées",
        text: "Un très bon prompt devient un skill en un clic. Une fois validé, il rejoint la marketplace interne de l'entreprise.",
      },
    ],
    sections: [
      {
        label: "Le produit",
        blocks: [
          {
            title: "Progression",
            text: "5 niveaux, de Poussière d'étoile à Constellation, 7 dimensions de maîtrise du prompting, des badges et des streaks.",
          },
          {
            title: "Confidentialité",
            text: "Aucune conversation n'est partagée. Managers et DSI voient des niveaux, de l'activité et des skills publiés, jamais le contenu des échanges.",
          },
          {
            title: "Architecture",
            text: "Un serveur MCP avec des widgets affichés dans le fil de l'assistant, un dashboard Next.js, Supabase, Stripe, et un agent dédié pour Microsoft 365 Copilot.",
          },
          {
            title: "Prix",
            text: "19,99 € HT par mois pour l'organisation, plus 2,99 € par membre, sans minimum de membres.",
          },
        ],
      },
      {
        label: "Go-to-market",
        blocks: [
          {
            title: "Les formateurs IA comme revendeurs",
            text: "Le formateur revend Orbi à ses clients au prix qu'il veut, l'intègre à ses formations et suit la progression de ses clients. Orbi le facture chaque mois au réel, par client actif et par membre.",
          },
          {
            title: "Prospection et outreach automatisés",
            text: "Une méthode en 7 étapes pour écrire chaque message à partir du profil du prospect (LinkedIn, posts, site), 30 modèles classés par cible, puis des e-mails personnalisés générés pour chaque formateur, en français et en anglais, et préparés un par un dans une page d'envoi.",
          },
        ],
      },
    ],
  },
  en: {
    heroTitle: "The coach that lives inside AI assistants",
    heroText:
      "Teams have AI, but few really know how to use it well. Good methods stay in the heads of a few power users, and trainings are forgotten within two weeks. Orbi coaches everyone right when they write to their assistant, then turns the best methods into shared skills.",
    cta: "Visit get-orbi.com",
    assistants: "Claude · ChatGPT · Copilot · Cursor",
    moodsLabel: "The mascot and its moods",
    moods: [
      { file: "orbi-neutral", label: "Neutral" },
      { file: "orbi-happy", label: "Happy" },
      { file: "orbi-thinking", label: "Thinking" },
      { file: "orbi-worried", label: "Worried" },
    ],
    howLabel: "How it works",
    steps: [
      {
        title: "Inside your AI assistant",
        text: "Orbi connects in minutes and only steps in when a prompt can really be improved.",
      },
      {
        title: "Coaching at the right time",
        text: "A short tip, a better phrasing and some XP. XP rewards good habits, never volume.",
      },
      {
        title: "Shared methods",
        text: "A great prompt becomes a skill in one click. Once approved, it joins the company's internal marketplace.",
      },
    ],
    sections: [
      {
        label: "The product",
        blocks: [
          {
            title: "Progression",
            text: "5 levels, from Stardust to Constellation, 7 dimensions of prompting mastery, badges and streaks.",
          },
          {
            title: "Privacy",
            text: "No conversation is ever shared. Managers and IT see levels, activity and published skills, never the content of the exchanges.",
          },
          {
            title: "Architecture",
            text: "An MCP server with widgets shown inside the assistant's thread, a Next.js dashboard, Supabase, Stripe, and a dedicated agent for Microsoft 365 Copilot.",
          },
          {
            title: "Pricing",
            text: "€19.99 excl. VAT per month for the organisation, plus €2.99 per member, with no minimum.",
          },
        ],
      },
      {
        label: "Go-to-market",
        blocks: [
          {
            title: "AI trainers as resellers",
            text: "Trainers resell Orbi to their clients at the price they choose, bundle it with their courses and follow their clients' progress. Orbi bills them monthly for actual use, per active client and per member.",
          },
          {
            title: "Automated prospecting and outreach",
            text: "A 7-step method to write each message from the prospect's profile (LinkedIn, posts, website), 30 templates sorted by target, then personalised emails generated for each trainer, in French and English, and lined up one by one in a sending page.",
          },
        ],
      },
    ],
  },
};

function Label({ children }: { children: string }) {
  return (
    <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-muted">
      {children}
    </h2>
  );
}

function BlockCard({ block }: { block: Block }) {
  return (
    <Card className="flex flex-col gap-1.5 p-5">
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-text">
        {block.title}
      </h3>
      <p className="text-[14px] leading-[1.6] text-text-muted">{block.text}</p>
    </Card>
  );
}

export function OrbiShowcase({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const openLabel = locale === "fr" ? "ouvre un nouvel onglet" : "opens in a new tab";

  return (
    <div className="mt-10 flex flex-col gap-10">
      <div className="overflow-hidden rounded-[24px] border border-surface-border bg-[#0b1120] shadow-[var(--card-shadow)]">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px]">
          <div className="flex flex-col gap-4 p-6 sm:p-7">
            <p className="text-[12px] font-medium text-[#94a3b8]">
              {copy.assistants}
            </p>
            <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#f8fafc]">
              {copy.heroTitle}
            </h2>
            <p className="text-[14px] leading-[1.65] text-[#cbd5e1]">
              {copy.heroText}
            </p>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${copy.cta} (${openLabel})`}
              className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#3b82f6] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {copy.cta}
              <span aria-hidden>↗</span>
            </a>
          </div>
          <Image
            src="/images/orbi/orbi-family.jpg"
            alt=""
            width={440}
            height={440}
            className="h-48 w-full object-cover sm:h-full"
          />
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <Label>{copy.howLabel}</Label>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <Card className="flex h-full flex-col gap-2 p-5">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#3b82f6]/12 text-[13px] font-semibold text-[#3b82f6]">
                  {index + 1}
                </span>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-text">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-text-muted">
                  {step.text}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {copy.sections.map((section) => (
        <section key={section.label} className="flex flex-col gap-4">
          <Label>{section.label}</Label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {section.blocks.map((block) => (
              <BlockCard key={block.title} block={block} />
            ))}
          </div>
        </section>
      ))}

      <section className="flex flex-col gap-4">
        <Label>{copy.moodsLabel}</Label>
        <Card className="grid grid-cols-4 gap-2 p-4 sm:p-5">
          {copy.moods.map((mood) => (
            <figure key={mood.file} className="flex flex-col items-center gap-1.5">
              <Image
                src={`/images/orbi/${mood.file}.webp`}
                alt=""
                width={96}
                height={96}
                className="size-16 object-contain sm:size-20"
              />
              <figcaption className="text-[12px] text-text-muted">
                {mood.label}
              </figcaption>
            </figure>
          ))}
        </Card>
      </section>
    </div>
  );
}
