import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
  requireFrench,
} from "@/components/recto/legal-page";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = rectoMetadata(
  "support",
  "Support",
  "Besoin d'aide avec Recto AI ? Abonnement, compte, données : les réponses et le contact.",
);

export default async function RectoSupport({
  params,
}: PageProps<"/[locale]/recto/support">) {
  const { locale } = await params;
  requireFrench(locale, "support");

  return (
    <LegalPage
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
