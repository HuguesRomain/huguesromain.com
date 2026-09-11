import type { Locale } from "./types";

export type FaqItem = {
  question: string;
  answer: string;
};

export function getFaqItems(locale: Locale): readonly FaqItem[] {
  if (locale === "fr") {
    return [
      {
        question: "Tu es disponible pour une mission ?",
        answer:
          "Oui. Je prends des missions freelance : ingénierie logicielle full-stack, workflows et agents IA, apps web et mobile, suivi et conseil. Pour un tarif, une date de début ou un contrat, écris-moi.",
      },
      {
        question: "Tu travailles où ?",
        answer:
          "Je vis à Nice et je travaille surtout en remote. Je peux me déplacer à Paris ou ailleurs de temps en temps.",
      },
      {
        question: "Quelle est ta stack ?",
        answer:
          "TypeScript, JavaScript, Python et SQL. Côté produit : React, Next.js, React Native / Expo, FastAPI, NestJS, PostgreSQL, Redis, Temporal. Je ne fais pas de C ni de C++.",
      },
      {
        question: "Sur quoi tu travailles en ce moment ?",
        answer:
          "Je co-fonde aiOrigin, une plateforme d'agents IA pour l'entreprise, et j'opère Axiome App Studio (Belle, KnuckleMax, Koji et d'autres apps). J'accompagne aussi des équipes en freelance.",
      },
    ];
  }
  return [
    {
      question: "Are you available for work?",
      answer:
        "Yes. I take freelance missions: full-stack software engineering, AI workflows and agents, web and mobile apps, follow-up and consulting. For rates, a start date or a contract, email me.",
    },
    {
      question: "Where do you work from?",
      answer:
        "I live in Nice, France, and I work mostly remote. I can travel to Paris or elsewhere from time to time.",
    },
    {
      question: "What's your stack?",
      answer:
        "TypeScript, JavaScript, Python and SQL. On the product side: React, Next.js, React Native / Expo, FastAPI, NestJS, PostgreSQL, Redis, Temporal. I don't do C or C++.",
    },
    {
      question: "What are you working on right now?",
      answer:
        "I co-found aiOrigin, a platform of autonomous AI agents for the enterprise, and I run Axiome App Studio (Belle, KnuckleMax, Koji and other apps). I also take freelance missions with product teams.",
    },
  ];
}
