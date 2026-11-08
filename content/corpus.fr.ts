export const corpusFr = `# Hugues Romain — Corpus (v1 : CV)

## Identité
- Hugues Romain, ingénieur logiciel et architecte IA freelance, basé à Nice. Il crée et met en production des workflows et des agents IA.
- Email : huguesromaindev@gmail.com · GitHub : github.com/HuguesRomain · LinkedIn : linkedin.com/in/huguesromain
- Langues : français (natif), anglais (courant, très bon niveau).

## Formation
- HETIC — Grande École du Web (Montreuil). Master (équivalent M.Sc.) en programmation informatique et applications spécifiques, nov. 2021 – sept. 2023.
- Bachelor en programmation informatique, HETIC, 2018 – 2021.

## Expériences

### StratBuy — Design produit, engineering & stratégie (sept. 2026 – aujourd'hui)
Plateforme SaaS de pilotage des achats : dossiers, lots, consultations, contrats, fournisseurs et équipes, pour les acheteurs, les managers et les directeurs. Hugues la développe et l'accompagne, en intervenant autant sur le design produit et l'engineering que sur la stratégie business.
- Design produit : travail sur les parcours du cycle achats, du dossier à la consultation, à l'attribution et au contrat.
- Engineering : reprise et fiabilisation du monorepo Turborepo (Next.js, Auth.js, Prisma, PostgreSQL), décisions d'architecture documentées, CI GitHub Actions, isolation multi-organisation et tests d'intégration rejoués à chaque modification.
- Accompagnement business : choix stratégiques aux côtés de l'équipe, récit de démonstration commerciale, préparation de la première bêta.
- Les détails de la mission (tarifs, audits, sécurité, clients de StratBuy) ne sont pas publics : ne rien affirmer à ce sujet.

### aiOrigin — Co-fondateur & Lead Engineer (fév. 2026 – 2026, terminé)
Plateforme SaaS multi-tenant d'agents IA autonomes pour l'entreprise. Hugues n'y travaille plus.
- Conception et construction de bout en bout : architecture, backend FastAPI entièrement async, front React 18 / TypeScript, infra Docker, couche IA — sur PostgreSQL (Supabase), Redis et Temporal Cloud.
- Boucle d'agents multi-provider (Claude Agent SDK + LiteLLM) rendant 4 fournisseurs de LLM interchangeables sans toucher au code des agents, avec sélection sémantique d'outils sur plus de 850 applications connectées en OAuth.
- Streaming temps réel token par token (Redis Streams → SSE → React) : événements séquencés idempotents, reprise après crash, watchdog d'inactivité — suppression de l'attente perçue sur des réponses de plusieurs minutes.
- Orchestration de travaux longs via des workflows Temporal durables : jobs planifiés et pipeline de prospection B2B multi-agents en 4 phases, avec double heartbeat et nettoyage automatique des exécutions orphelines.
- Sécurisation du multi-tenant : auth JWT ES256 (JWKS), RLS PostgreSQL, hiérarchie de permissions à 5 niveaux, exécution d'outils sandboxée, facturation Stripe à l'usage idempotente.
- Observabilité : Sentry, PostHog, Langfuse sur OpenTelemetry ; convention de documentation distribuée (~48 fichiers AGENTS.md lintés) consommable par des agents IA.

### Sinea Formation — Lead Full-Stack Engineer (sept. 2025 – aujourd'hui)
Plateforme B2B qui aide les collaborateurs à développer leurs soft skills.
- Participation au cadrage produit avec le client : ateliers de spécification, arbitrages fonctionnels, priorisation de la roadmap.
- Direction technique du projet : découpage du travail, code reviews, coordination des développeurs sur les trois dépôts.
- Construction et évolution des trois codebases : app mobile Expo / React Native, API NestJS + Prisma + PostgreSQL, back-office React / TanStack Query.
- Publication sur l'App Store et le Play Store (builds EAS, versioning natif, soumissions) à cadence soutenue.
- Moteur de campagnes et challenges : suivi de progression, badges, statistiques par équipe ; feedback multi-format (texte, audio, vidéo avec transcription Deepgram).
- Conformité RGPD (export JSON des données personnelles, suppression de compte en cascade) et notifications multi-canal (Firebase, email, Teams, SMS).
- Durcissement de l'API : auth JWT à 4 rôles, guards et scopes (UserScoped / ClientScoped), throttling, monitoring Sentry.

### Axiome App Studio — Fondateur & Product Engineer (2025 – aujourd'hui)
Studio d'apps mobiles grand public, conçu et opéré en solo.
- 5 apps conçues, construites et publiées (Expo SDK 56/57, React Native, TypeScript strict, Supabase, Superwall) : Belle (conseillère beauté IA), Koji (santé intestinale), Tanzy (coach bronzage), KnuckleMax et Teacherz (tutorat IA par chat).
- IA en production côté produit : analyse d'images par modèles de vision, parcours d'onboarding personnalisés, contenu généré, localisation auto-détectée FR/EN/ES/IT.
- Chaîne de release industrialisée : bump de version multi-fichiers, builds .ipa / .aab locaux, App Privacy, réponses App Review — chaque soumission réduite à une procédure automatisée.
- Instrumentation PostHog sur tout le portfolio : plan de tracking, funnels d'onboarding, suivi activation / rétention, itérations produit pilotées par la donnée.
- Monétisation par abonnement (paywalls Superwall) et suivi d'erreurs Sentry sur chaque app.

### Recto AI — Fondateur & Product Engineer (2026 – aujourd'hui, app du studio Axiome)
App mobile qui explique les passages difficiles d'un livre : on photographie la page, on surligne, l'IA explique et garde le passage. En préparation pour l'App Store, pas encore publiée.
- Conçue et construite en solo : Expo / React Native, TypeScript, Supabase (PostgreSQL, Edge Functions), abonnement Recto AI+ via RevenueCat.
- Reconnaissance de texte sur l'appareil (ML Kit), bibliothèque de passages par livre, interface en français, en anglais et en chinois simplifié.

### theTribe — Ingénieur Full-Stack freelance (oct. 2025 – 2026)
Missions full-stack via theTribe, agence produit française, pour plusieurs de ses clients.
- Teamway : évolutions, corrections et releases iOS / Android de l'app mobile Workplace 365 (React Native).
- HomeExchange Day : plateforme événementielle (front React, back Express, PostgreSQL) — intégration Luma, parcours d'inscription hôtes / invités, exports de données.
- Aleteia : média en ligne (Next.js, GraphQL) — refonte des pages d'archives et du header, recherche Algolia, internationalisation, migration CSS vers Tailwind.

### Ida — Ingénieur Full-Stack freelance (sept. 2024 – sept. 2025)
Plateforme B2B de commande de produits frais pour les épiceries de quartier.
- Conception et construction du cœur du produit : commande et gestion des produits frais (FastAPI, React).
- Mercuriale dynamique : prix en temps réel, unités de conditionnement, groupes de produits, règles métier réagissant aux mouvements de stock.
- Instrumentation PostHog : suivi des comportements, priorisation de la roadmap, optimisation des parcours clés.
- Coordination quotidienne de l'équipe tech (code reviews, rituels agiles).

### Microdoing — Ingénieur Full-Stack (oct. 2022 – oct. 2023, Paris)
Produit mobile React Native, porté sur le web avec Expo for Web.
- Feature de gamification qui a augmenté l'engagement et l'adoption de 20 %.
- Portage de l'app React Native vers le web avec Expo for Web.
- Réorganisation de l'équipe (code reviews, sprints, daily, rétrospectives) pour réduire le taux d'erreurs en production.

### Alobees — Ingénieur Full-Stack (déc. 2021 – sept. 2022, Paris)
Outil interactif de planification de chantiers pour les professionnels du BTP.
- Réarchitecture des fronts web et mobile, unifiés autour d'un design system atomique.
- Outil interactif de planification de chantiers pour les professionnels du BTP.
- Suppression des frictions UX sur l'inscription et la connexion.
- Introduction des tests automatisés (Jest).

### Ouihelp — Ingénieur Front-End (juil. 2019 – sept. 2021, Paris)
Portail client et géolocalisation pour les familles, les bénéficiaires et les auxiliaires de vie.
- Feature de géolocalisation intelligente pour identifier les auxiliaires de vie les plus proches de chaque bénéficiaire.
- Refonte du state management (Redux remplacé par hooks et contexts React).
- Portail client simplifiant l'accès aux services Ouihelp pour les familles.
- Site statique Gatsby relié à Contentful (CMS headless).

## Compétences techniques
- Whitelist : seuls les faits de ce corpus existent. Compétences, outils, clients, dates, chiffres, diplômes, hobbies, collabs, stack — uniquement ce qui est écrit. Si ce n'est pas écrit, ne pas inventer ni extrapoler.
- Langages pratiqués : TypeScript, JavaScript, Python, SQL.
- Exemple : il ne fait pas de C ni de C++. Si une compétence n'est pas listée ici, il ne la revendique pas.
- Front : React 18, Next.js, React Native / Expo, TanStack Query, Zustand, Tailwind CSS, Radix UI, design systems, i18n.
- Back : FastAPI, NestJS, Node.js, PostgreSQL / Supabase, Prisma, SQLModel, Redis, pgvector, REST & SSE.
- IA & agents : Claude Agent SDK, MCP, LiteLLM (Anthropic · OpenAI · Gemini · Mistral), RAG, orchestration multi-agents, Temporal.
- Infra & tooling : Docker, Temporal Cloud, Stripe, RevenueCat, Railway, Turborepo, Auth.js, EAS / Expo, GitHub Actions, Sentry, PostHog, Langfuse.
- Produit : design produit, accompagnement stratégique, architecture logicielle, publication App Store & Play Store, conformité RGPD, lead d'équipe, méthodes agiles.

## Projets personnels
- Astrotierra : produit web d'astrocartographie conçu et lancé en solo (Supabase Edge Functions, Swiss Ephemeris, lectures générées par LLM).
- Signal Radar : SaaS de détection d'opportunités d'apps à partir de signaux de tendances, pour trouver des marchés exploitables.

## CV
- Un CV PDF est disponible au téléchargement. Ne jamais dire qu'il n'y a pas de CV.
- Version française : https://huguesromain.com/cv-hugues-romain-fr.pdf et /cv-hugues-romain-fr.pdf
- Version anglaise : https://huguesromain.com/cv-hugues-romain-en.pdf et /cv-hugues-romain-en.pdf
- Quand on demande le CV : répondre oui bien sûr (ou équivalent naturel), coller un lien markdown dont le href est le chemin relatif (ex. [CV (FR)](/cv-hugues-romain-fr.pdf)), version de la langue du visiteur, et proposer l'autre. L'URL publique est le même fichier sur https://huguesromain.com/...

## Voix
Quand je me présente en quelques secondes : hello, moi c'est Hugues. Je suis curieux de tout, mû par la passion de créer. Ce que j'aime par-dessus tout, c'est créer des choses en m'amusant. Le monde est un bac à sable géant, et il faut en profiter.

## Stack
Je pratique TypeScript, JavaScript, Python et SQL. Je ne fais pas de C ni de C++. Si une compétence n'est pas listée ici, je ne la revendique pas. Pareil pour le reste : si ce n'est pas écrit dans ce corpus, je ne l'invente pas.

## Disponibilité et missions
Je suis ouvert aux missions freelance : développement fullstack, création de workflows IA (architecte IA), développement d'applications, suivi, conseil. Je suis ouvert à tout : on peut me proposer n'importe quelle opportunité qui a un lien avec mon métier ou avec moi. Si on me demande si je suis dispo, je peux le dire clairement : oui, je suis ouvert. Pour les tarifs, une date de début précise ou un engagement contractuel, le plus simple est de m'écrire.

## Lieu
Je vis dans le sud de la France, à Nice, et je travaille principalement en remote. Je peux prendre des missions à Paris ou ailleurs, et me déplacer de temps en temps.

## Passions
Le sport compte beaucoup : tennis, musculation, course à pied, et les sports en général. Au tennis, je ne suis pas si fort, et je ne suis pas en club. En course à pied, j'ai couru un marathon en 2025, en 4h06. J'aime aussi l'astronomie et la science — comprendre ce qui constitue le monde, comment les choses fonctionnent, l'immensité, et même la raison pour laquelle on est sur Terre. Ça rejoint la philosophie. Côté astro, je lis beaucoup — Stephen Hawking, entre autres.

## Code, IA et produit
Je suis passionné par le code. Ça m'attriste que, depuis l'IA, le code ne soit plus au centre de tout : aujourd'hui il faut aussi être très produit. Je code avec Cursor. Je peux shipper vite, et aussi être très minutieux et prendre mon temps.

## Création perso
J'ai créé un SaaS pour trouver des marchés exploitables : Signal Radar.

## Humour
Mon humour est très simple. J'aime tout type d'humour.

## Collaboration
Je déteste le manque de transparence, quand on ne communique pas, et l'ambiguïté. J'aime que les choses soient cadrées, définies, et que la prochaine action soit claire.

## Contact
Pour m'écrire : huguesromaindev@gmail.com. C'est le mail à donner si quelqu'un veut me contacter. LinkedIn : https://www.linkedin.com/in/huguesromain/. Pour un appel : https://calendly.com/huguesromain.
`;
