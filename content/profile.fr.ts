import { CALENDLY_URL, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import type { Profile } from "./types";

export const profileFr: Profile = {
  locale: "fr",
  name: "Hugues Romain",
  tagline:
    "Ingénieur logiciel, architecte IA — freelance · workflows et agents IA, produits web & mobile de bout en bout · Nice",
  heroFirstName: "Hugues",
  heroLastName: "Romain",
  sections: {
    work: { label: "001 / WORK", title: "Selected work" },
    stack: { label: "002 / STACK", title: "Stack" },
    about: { label: "003 / ABOUT", title: "About" },
    contact: { label: "004 / CONTACT", title: "Contact" },
  },
  projects: [
    {
      slug: "stratbuy",
      title: "StratBuy",
      role: "Design produit, engineering & stratégie",
      period: "2026 — aujourd'hui",
      context:
        "Plateforme SaaS de pilotage des achats, que je développe et accompagne, du produit à la stratégie business.",
      bullets: [
        "Design produit : travail sur les parcours du cycle achats, du dossier à la consultation, à l'attribution et au contrat",
        "Engineering : reprise et fiabilisation du monorepo Turborepo (Next.js, Auth.js, Prisma, PostgreSQL), décisions d'architecture documentées, CI GitHub Actions, isolation multi-organisation et tests d'intégration rejoués à chaque modification",
        "Accompagnement business : choix stratégiques aux côtés de l'équipe, récit de démonstration commerciale, préparation de la première bêta",
      ],
      image: "/images/projects/stratbuy-icon.png",
      imageAlt: "Icône StratBuy",
    },
    {
      slug: "sinea",
      title: "Sinea Formation",
      role: "Lead Full-Stack Engineer",
      period: "2025 — aujourd'hui",
      context:
        "Plateforme B2B qui aide les collaborateurs à développer leurs soft skills.",
      bullets: [
        "Trois codebases construites et menées : app mobile Expo / React Native, API NestJS + Prisma + PostgreSQL, back-office React",
        "Publiée sur l'App Store et le Play Store (builds EAS), cadence de release soutenue",
        "Moteur de campagnes et challenges : progression, badges, feedback texte / audio / vidéo transcrit par Deepgram",
      ],
      image: "/images/work-sinea.webp",
      imageAlt: "Structure métallique en treillis sur ciel noir",
    },
    {
      slug: "aiorigin",
      title: "aiOrigin",
      role: "Co-fondateur & Lead Engineer",
      period: "2026",
      context:
        "Plateforme SaaS multi-tenant d'agents IA autonomes pour l'entreprise.",
      bullets: [
        "Conçue et construite de bout en bout : backend FastAPI async, front React / TypeScript, infra Docker, PostgreSQL, Redis, Temporal Cloud",
        "Boucle d'agents multi-provider (Claude Agent SDK + LiteLLM) : 4 LLM interchangeables, sélection sémantique d'outils sur 850+ apps OAuth",
        "Streaming temps réel token par token (Redis Streams → SSE → React) : événements séquencés idempotents, reprise sur crash",
      ],
      image: "/images/work-aiorigin.webp",
      imageAlt: "Sculpture classique en marbre, profil éclairé sur fond noir",
    },
    {
      slug: "recto",
      title: "Recto AI",
      role: "Fondateur & Product Engineer",
      period: "2026 — aujourd'hui",
      context:
        "App mobile qui explique les passages difficiles d'un livre : on photographie la page, on surligne, l'IA explique et garde le passage.",
      bullets: [
        "Conçue et construite en solo : Expo / React Native, TypeScript, Supabase (PostgreSQL, Edge Functions), abonnement RevenueCat",
        "Parcours central : photo de la page, reconnaissance de texte sur l'appareil (ML Kit), surlignage, explication IA, bibliothèque de passages par livre",
        "Interface en français, en anglais et en chinois simplifié ; app en préparation pour l'App Store",
      ],
      image: "/images/projects/recto-icon.png",
      imageAlt: "Icône Recto AI",
    },
    {
      slug: "axiome",
      title: "Axiome App Studio",
      role: "Fondateur & Product Engineer",
      period: "2025 — aujourd'hui",
      context: "Studio d'apps mobiles grand public, conçu et opéré en solo.",
      bullets: [
        "5 apps conçues, construites et publiées : Belle, Koji, Tanzy, KnuckleMax, Teacherz (Expo, TypeScript strict, Supabase, Superwall)",
        "IA en production : analyse d'image par modèles de vision, onboarding personnalisé, localisation auto FR / EN / ES / IT",
        "Chaîne de release industrialisée et analytics PostHog sur tout le portfolio : funnels, activation, rétention",
      ],
      image: "/images/work-axiome.webp",
      imageAlt: "Macro d'un circuit imprimé en lumière rasante",
    },
    {
      slug: "thetribe",
      title: "theTribe",
      role: "Ingénieur Full-Stack (freelance)",
      period: "2025 — 2026",
      context:
        "Missions full-stack via theTribe, agence produit française, pour plusieurs de ses clients.",
      bullets: [
        "Teamway — app mobile Workplace 365 (React Native) : évolutions, corrections et releases iOS / Android",
        "HomeExchange Day — plateforme événementielle (React, Express, PostgreSQL) : intégration Luma, parcours d'inscription hôtes / invités",
        "Aleteia — média en ligne (Next.js, GraphQL) : refonte des pages d'archives et du header, recherche Algolia, i18n, migration CSS vers Tailwind",
      ],
      image: "/images/projects/thetribe-logo.png",
      imageAlt: "Logo theTribe",
    },
    {
      slug: "ida",
      title: "Ida",
      role: "Ingénieur Full-Stack (freelance)",
      period: "2024 — 2025",
      context:
        "Plateforme B2B de commande de produits frais pour les épiceries de quartier.",
      bullets: [
        "Cœur du produit conçu et construit : commande et gestion des produits frais (FastAPI, React)",
        "Mercuriale dynamique : prix temps réel, unités de conditionnement, règles métier réagissant aux mouvements de stock",
        "Coordination quotidienne de l'équipe tech : code reviews, rituels agiles",
      ],
      image: "/images/work-ida.webp",
      imageAlt: "Crête de dune sculptée par le vent dans l'obscurité",
    },
    {
      slug: "microdoing",
      title: "Microdoing",
      role: "Ingénieur Full-Stack (alternance)",
      period: "2022 — 2023",
      context:
        "Produit mobile React Native, porté sur le web avec Expo for Web.",
      bullets: [
        "Feature de gamification qui a augmenté l'engagement et l'adoption de 20 %",
        "Portage de l'app React Native vers le web avec Expo for Web",
        "Réorganisation de l'équipe (code reviews, sprints, daily, rétrospectives) pour réduire le taux d'erreurs en production",
      ],
      image: "/images/projects/microdoing-logo.png",
      imageAlt: "Logo Microdoing",
    },
    {
      slug: "alobees",
      title: "Alobees",
      role: "Ingénieur Full-Stack (alternance)",
      period: "2021 — 2022",
      context:
        "Outil interactif de planification de chantiers pour les professionnels du BTP.",
      bullets: [
        "Réarchitecture des fronts web et mobile, unifiés autour d'un design system atomique",
        "Outil interactif de planification de chantiers pour les professionnels du BTP",
        "Suppression des frictions UX sur l'inscription et la connexion",
      ],
      image: "/images/projects/alobees-logo.png",
      imageAlt: "Logo Alobees",
    },
    {
      slug: "ouihelp",
      title: "Ouihelp",
      role: "Ingénieur Front-End (alternance)",
      period: "2019 — 2021",
      context:
        "Portail client et géolocalisation pour les familles, les bénéficiaires et les auxiliaires de vie.",
      bullets: [
        "Géolocalisation intelligente pour identifier les auxiliaires de vie les plus proches de chaque bénéficiaire",
        "Refonte du state management : Redux remplacé par hooks et contexts React",
        "Portail client simplifiant l'accès aux services Ouihelp pour les familles",
      ],
      image: "/images/projects/ouihelp-logo.png",
      imageAlt: "Logo Ouihelp",
    },
  ],
  stack: [
    { label: "Langages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
    {
      label: "Front",
      items: [
        "React",
        "Next.js",
        "React Native / Expo",
        "TanStack Query",
        "Zustand",
        "Tailwind CSS",
        "Radix UI",
      ],
    },
    {
      label: "Back",
      items: [
        "FastAPI",
        "NestJS",
        "Node.js",
        "PostgreSQL / Supabase",
        "Prisma",
        "Redis",
        "pgvector",
        "REST & SSE",
      ],
    },
    {
      label: "IA & agents",
      items: [
        "Claude Agent SDK",
        "MCP",
        "LiteLLM",
        "RAG",
        "Orchestration multi-agents",
        "Temporal",
      ],
    },
    {
      label: "Infra",
      items: [
        "Docker",
        "Temporal Cloud",
        "Stripe",
        "Railway",
        "EAS / Expo",
        "GitHub Actions",
        "Sentry",
        "PostHog",
        "Langfuse",
      ],
    },
  ],
  about: {
    paragraphs: [
      "Ingénieur logiciel et architecte IA freelance à Nice depuis 2024 sous ma société Axiome, je conçois et construis des produits web et mobiles de bout en bout. Je crée et mets en production des workflows et des agents IA. Diplômé d'HETIC, formé en alternance chez Ouihelp, Alobees puis Microdoing, j'accompagne aujourd'hui StratBuy, du design produit à la stratégie business, et je lance Recto AI, une app qui explique les passages difficiles d'un livre.",
      "Mon terrain : les systèmes où l'IA rencontre la vraie ingénierie — boucles d'agents multi-providers, streaming temps réel, workflows durables, apps mobiles publiées en solo. Basé à Nice, je travaille en français comme en anglais.",
    ],
    portrait: "/images/portrait.webp",
    portraitAlt: "Portrait de Hugues Romain",
    portraitHint: "SURVOLER POUR RÉSOUDRE",
  },
  contact: {
    intro:
      "Un doute sur une archi, un agent à mettre en prod, un produit à construire de bout en bout — écrivez-moi, je réponds vite.",
    email: CONTACT_EMAIL,
    github: GITHUB_URL,
    linkedin: LINKEDIN_URL,
    booking: CALENDLY_URL,
    bookingLabel: "Réserver un appel",
  },
  chat: {
    promptHeading: "Je suis dispo pour discuter, ici ! 😁",
    placeholders: [
      "Tu es dispo en ce moment ?",
      "C'est quoi ton parcours ?",
      "T'habites où, tu travailles comment ?",
      "T'es comment à travailler avec toi ?",
    ],
    chips: [
      "Tu es dispo en ce moment ?",
      "C'est quoi ton parcours ?",
      "T'habites où, tu travailles comment ?",
    ],
    panelTitle: "Discussion avec Hugues",
    youLabel: "Vous",
    meLabel: "Hugues · IA",
    stop: "Stop",
    clear: "Effacer",
    retry: "Réessayer",
    errorNetwork:
      "La connexion a échoué. Vérifiez votre réseau et réessayez.",
    errorRateLimit:
      "Limite atteinte : 20 messages par heure. Revenez un peu plus tard, ou écrivez-moi directement par email.",
    errorEmpty: "Réponse vide reçue. Relancez la question.",
    closeHint: "Esc pour fermer",
    close: "Fermer la conversation",
    inputAriaLabel: "Parlez avec Hugues — posez-lui votre question",
    sendAriaLabel: "Envoyer la question",
    panelAriaLabel: "Discussion avec Hugues (version IA)",
  },
  footer: "BUILT WITH NEXT.JS · NO TEMPLATE",
};
