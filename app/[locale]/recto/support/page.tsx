import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
} from "@/components/recto/legal-page";
import { isLocale } from "@/content/get-profile";
import { CONTACT_EMAIL } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/recto/support">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return rectoMetadata(
    locale,
    "support",
    "Support",
    locale === "fr"
      ? "Besoin d'aide avec Recto AI ? Abonnement, compte, données : les réponses et le contact."
      : "Need help with Recto AI? Subscription, account, data: answers and how to reach us.",
  );
}

export default async function RectoSupport({
  params,
}: PageProps<"/[locale]/recto/support">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale === "fr" ? <SupportFr /> : <SupportEn />;
}

function SupportFr() {
  return (
    <LegalPage
      locale="fr"
      title="Support"
      intro="Une question ou un problème avec Recto AI ? Voici les réponses les plus courantes et comment nous écrire."
    >
      <LegalSection title="Nous contacter">
        <p>
          Écris à <a href={`mailto:${CONTACT_EMAIL}?subject=Recto%20AI`}>{CONTACT_EMAIL}</a>,
          avec le modèle de ton téléphone et la version de l&apos;application, visible en bas
          des Réglages.
        </p>
      </LegalSection>

      <LegalSection title="Comment annuler mon abonnement ?">
        <p>
          Dans Recto, ouvre Réglages &gt; Gérer l&apos;abonnement. Tu peux aussi passer par
          Réglages de l&apos;iPhone &gt; ton nom &gt; Abonnements. Annule au moins 24 heures
          avant la fin de la période pour éviter le renouvellement.
        </p>
      </LegalSection>

      <LegalSection title="Comment être remboursé ?">
        <p>
          Apple traite les remboursements. Fais ta demande sur{" "}
          <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.
        </p>
      </LegalSection>

      <LegalSection title="Mon abonnement n'apparaît plus">
        <p>
          Vérifie que tu utilises le même identifiant Apple et, si tu en as un, le même
          compte Recto, puis touche « Restaurer » sur
          l&apos;écran d&apos;abonnement ou « Restaurer mes achats » dans les Réglages.
        </p>
      </LegalSection>

      <LegalSection title="Comment supprimer mon compte ?">
        <p>
          Dans Réglages, touche « Supprimer mon compte », ou « Effacer mes données » si tu
          utilises Recto sans compte. Sans abonnement actif, ouvre « Compte » en bas de
          l&apos;écran d&apos;abonnement. Si tu t&apos;es connecté avec Apple, confirme la
          demande d&apos;Apple. Tes livres, passages et discussions sont effacés. Pense à
          annuler ton abonnement séparément.
        </p>
      </LegalSection>

      <LegalSection title="Comment retirer mon accord pour l'IA ?">
        <p>
          Dans Réglages &gt; Mes données, touche « Partage avec l&apos;IA ». Plus rien n&apos;est
          envoyé à DeepSeek tant que tu ne donnes pas à nouveau ton accord.
        </p>
      </LegalSection>

      <LegalSection title="Une réponse de l'IA est fausse ou choquante">
        <p>
          Touche « Signaler cette réponse » dans l&apos;application, ou écris-nous en indiquant
          le livre et le passage. Nous répondons dès que possible.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function SupportEn() {
  return (
    <LegalPage
      locale="en"
      title="Support"
      intro="A question or a problem with Recto AI? Here are the most common answers and how to write to us."
    >
      <LegalSection title="Contact us">
        <p>
          Write to <a href={`mailto:${CONTACT_EMAIL}?subject=Recto%20AI`}>{CONTACT_EMAIL}</a>,
          with your phone model and the app version, shown at the bottom of Settings.
        </p>
      </LegalSection>

      <LegalSection title="How do I cancel my subscription?">
        <p>
          In Recto, open Settings &gt; Manage subscription. You can also go through iPhone
          Settings &gt; your name &gt; Subscriptions. Cancel at least 24 hours before the end
          of the period to avoid renewal.
        </p>
      </LegalSection>

      <LegalSection title="How do I get a refund?">
        <p>
          Apple handles refunds. Make your request at{" "}
          <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.
        </p>
      </LegalSection>

      <LegalSection title="My subscription no longer appears">
        <p>
          Check that you are using the same Apple ID and, if you have one, the same Recto
          account, then tap “Restore” on the subscription screen or “Restore my purchases”
          in Settings.
        </p>
      </LegalSection>

      <LegalSection title="How do I delete my account?">
        <p>
          In Settings, tap “Delete my account”, or “Erase my data” if you use Recto without
          an account. Without an active subscription, open “Account” at the bottom of the
          subscription screen. If you signed in with Apple, confirm Apple&apos;s request. Your
          books, passages and conversations are erased. Remember to cancel your subscription
          separately.
        </p>
      </LegalSection>

      <LegalSection title="How do I withdraw my consent for the AI?">
        <p>
          In Settings &gt; My data, tap “Sharing with AI”. Nothing more is sent to DeepSeek
          until you give your consent again.
        </p>
      </LegalSection>

      <LegalSection title="An AI answer is wrong or offensive">
        <p>
          Tap “Report this answer” in the app, or write to us with the book and the passage.
          We reply as soon as possible.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
