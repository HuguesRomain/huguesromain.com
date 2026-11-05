import { getProfile } from "./get-profile";
import { profileEn } from "./profile.en";
import type { Locale, Profile, Project } from "./types";

export const VENTURE_SLUGS = ["axiome", "recto"] as const;

const EXPERIENCE_EXTRAS: Record<Locale, Partial<Record<string, readonly string[]>>> =
  {
    fr: {
      stratbuy: [
        "Le produit couvre les dossiers d'achat, les lots, les consultations, les contrats, les fournisseurs et les équipes, pour les acheteurs, les managers et les directeurs. J'y interviens autant sur le design produit et le code que sur la stratégie business.",
      ],
      aiorigin: [
        "Orchestration de travaux longs via des workflows Temporal durables : jobs planifiés et pipeline de prospection B2B multi-agents en 4 phases, avec double heartbeat et nettoyage automatique des exécutions orphelines.",
        "Sécurisation du multi-tenant : auth JWT ES256 (JWKS), RLS PostgreSQL, hiérarchie de permissions à 5 niveaux, exécution d'outils sandboxée, facturation Stripe à l'usage idempotente.",
      ],
      sinea: [
        "Participation au cadrage produit avec le client : ateliers de spécification, arbitrages fonctionnels, priorisation de la roadmap. Direction technique : découpage du travail, code reviews, coordination des développeurs sur les trois dépôts.",
        "Conformité RGPD (export JSON des données personnelles, suppression de compte en cascade), notifications multi-canal (Firebase, email, Teams, SMS), et durcissement de l'API : auth JWT à 4 rôles, guards et scopes, throttling, monitoring Sentry.",
      ],
      axiome: [
        "Chaîne de release industrialisée : bump de version multi-fichiers, builds .ipa / .aab locaux, App Privacy, réponses App Review — chaque soumission réduite à une procédure automatisée.",
        "Monétisation par abonnement (paywalls Superwall) et suivi d'erreurs Sentry sur chaque app.",
        "Dernière app en préparation : Recto AI, qui explique les passages difficiles d'un livre.",
      ],
      ida: [
        "Instrumentation PostHog : suivi des comportements, priorisation de la roadmap, optimisation des parcours clés.",
      ],
      alobees: [
        "Introduction des tests automatisés (Jest).",
      ],
      ouihelp: [
        "Site statique Gatsby relié à Contentful (CMS headless).",
      ],
    },
    en: {
      stratbuy: [
        "The product covers sourcing files, lots, tenders, contracts, suppliers and teams, for buyers, managers and directors. I work on product design and code as much as on business strategy.",
      ],
      aiorigin: [
        "Orchestrated long-running work through durable Temporal workflows — scheduled jobs and a 4-phase multi-agent B2B prospecting pipeline — with dual heartbeats and automatic cleanup of orphaned runs.",
        "Secured multi-tenancy: ES256 JWT auth (JWKS), PostgreSQL RLS, a 5-level permission hierarchy, sandboxed tool execution and idempotent Stripe usage-based billing.",
      ],
      sinea: [
        "Contributed to product design and scoping alongside the client: specification workshops, functional trade-offs and roadmap prioritisation. Led the technical side: work breakdown, code reviews and coordination of the developers across the three repositories.",
        "Implemented GDPR compliance (JSON export of personal data, cascading account deletion), multi-channel notifications (Firebase, email, Teams, SMS), and hardened the API: 4-role JWT authentication, guards and scopes, throttling and Sentry monitoring.",
      ],
      axiome: [
        "Industrialised the full release chain — multi-file version bumping, local .ipa / .aab builds, App Privacy, App Review responses — reducing each submission to an automated procedure.",
        "Set up subscription monetisation (Superwall paywalls) and Sentry error tracking across every app.",
        "Latest app in preparation: Recto AI, which explains the hard passages of a book.",
      ],
      ida: [
        "Instrumented the product with PostHog to track user behaviour, prioritise the roadmap and optimise key flows.",
      ],
      alobees: [
        "Introduced automated testing (Jest).",
      ],
      ouihelp: [
        "Created a Gatsby static site wired to Contentful (headless CMS).",
      ],
    },
  };

export function getProjectSlugs(): readonly string[] {
  return profileEn.projects.map((project) => project.slug);
}

export function isVentureSlug(slug: string): boolean {
  return (VENTURE_SLUGS as readonly string[]).includes(slug);
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProfile(locale).projects.find((project) => project.slug === slug);
}

export function getExperienceProjects(profile: Profile): Project[] {
  return profile.projects.filter((project) => !isVentureSlug(project.slug));
}

export function getVentureProjects(profile: Profile): Project[] {
  return VENTURE_SLUGS.flatMap((slug) => {
    const project = profile.projects.find((item) => item.slug === slug);
    return project ? [project] : [];
  });
}

export function getExperienceExtras(
  locale: Locale,
  slug: string,
): readonly string[] {
  return EXPERIENCE_EXTRAS[locale][slug] ?? [];
}

export function experienceHref(locale: Locale, slug: string): string {
  return `/${locale}/experience/${slug}`;
}
