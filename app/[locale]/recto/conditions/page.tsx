import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
  requireFrench,
} from "@/components/recto/legal-page";
import { CONTACT_EMAIL, PERSON_NAME } from "@/lib/site";

export const metadata: Metadata = rectoMetadata(
  "conditions",
  "Conditions d'utilisation",
  "Les conditions d'utilisation de l'application Recto AI et de l'abonnement Recto AI+.",
);

export default async function RectoTerms({
  params,
}: PageProps<"/[locale]/recto/conditions">) {
  const { locale } = await params;
  requireFrench(locale, "conditions");

  return (
    <LegalPage
      title="Conditions d'utilisation"
      intro="Ces conditions encadrent ton utilisation de Recto AI, l'application qui t'explique les passages de tes livres papier."
      updated="5 novembre 2026"
    >
      <LegalSection title="1. Éditeur">
        <p>
          Recto AI est éditée par {PERSON_NAME}, à Nice, en France. Contact :{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="2. Le service">
        <p>
          Recto lit la page que tu photographies sur ton téléphone, t&apos;explique
          le passage que tu sélectionnes grâce à une intelligence artificielle, te
          permet de poser des questions sur ce passage et range tes passages par
          livre dans ta bibliothèque.
        </p>
        <p>
          Le compte est facultatif : sans compte, ta bibliothèque reste sur ton
          téléphone et disparaît si tu supprimes l&apos;application ; avec un compte,
          elle te suit sur tes appareils. Tu dois avoir au moins 15 ans, ou
          l&apos;accord d&apos;un parent ou tuteur.
        </p>
      </LegalSection>

      <LegalSection title="3. Abonnement Recto AI+">
        <ul>
          <li>
            <strong>Formules :</strong> annuelle ou hebdomadaire, au prix affiché dans
            l&apos;application avant l&apos;achat.
          </li>
          <li>
            <strong>Essai gratuit :</strong> la formule annuelle peut inclure 3 jours
            d&apos;essai si tu y es éligible. Sans annulation avant la fin de
            l&apos;essai, le prix annuel est facturé.
          </li>
          <li>
            <strong>Renouvellement :</strong> l&apos;abonnement se renouvelle
            automatiquement pour la même durée, sauf annulation au moins 24 heures
            avant la fin de la période en cours.
          </li>
          <li>
            <strong>Annulation :</strong> depuis les réglages de ton compte Apple.
            Supprimer l&apos;application ou ton compte Recto n&apos;annule pas
            l&apos;abonnement.
          </li>
          <li>
            <strong>Paiement et remboursement :</strong> Apple encaisse le paiement et
            traite les demandes de remboursement sur{" "}
            <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.
          </li>
          <li>
            <strong>Usage raisonnable :</strong> pour protéger le service, des limites
            quotidiennes s&apos;appliquent, par exemple 300 explications par jour.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Les réponses de l'IA">
        <p>
          Les explications sont générées automatiquement et peuvent contenir des
          erreurs. Elles aident à comprendre un texte, sans remplacer l&apos;œuvre ni
          un avis professionnel. Vérifie ce qui compte pour toi, et signale une
          réponse problématique depuis l&apos;application ou par e-mail.
        </p>
      </LegalSection>

      <LegalSection title="5. Tes contenus et les bonnes pratiques">
        <p>
          Tes passages et tes questions restent à toi. Tu nous autorises à les traiter
          uniquement pour faire fonctionner le service, comme le décrit la{" "}
          <Link href="/fr/recto/confidentialite">politique de confidentialité</Link>.
        </p>
        <p>
          Utilise Recto pour un usage personnel. Ne t&apos;en sers pas pour diffuser
          des œuvres protégées, contourner le service ou produire des contenus
          illégaux. En cas d&apos;abus grave, l&apos;accès peut être suspendu.
        </p>
      </LegalSection>

      <LegalSection title="6. Disponibilité et responsabilité">
        <p>
          Le service peut être interrompu pour maintenance ou évoluer. Rien dans ces
          conditions ne limite les droits que la loi te garantit en tant que
          consommateur, notamment la garantie légale de conformité.
        </p>
      </LegalSection>

      <LegalSection title="7. Suppression du compte">
        <p>
          Tu peux supprimer ton compte à tout moment dans les Réglages de
          l&apos;application. Tes livres, passages et discussions sont alors effacés.
          Si tu utilises Recto sans compte, « Effacer mes données » fait de même sur
          ton téléphone.
        </p>
      </LegalSection>

      <LegalSection title="8. Apple">
        <p>
          Ces conditions te lient à {PERSON_NAME}, et non à Apple, qui n&apos;est pas
          responsable de l&apos;application ni de son contenu, de sa maintenance, de
          son support ou des réclamations la concernant. Si l&apos;application ne
          respecte pas une garantie applicable, tu peux le signaler à Apple, qui pourra
          rembourser son prix d&apos;achat ; Apple n&apos;a pas d&apos;autre obligation
          de garantie. Apple et ses filiales sont bénéficiaires tiers de ces conditions
          et peuvent les faire appliquer. Tu déclares ne pas résider dans un pays soumis
          à un embargo américain et ne pas figurer sur une liste américaine de personnes
          interdites ou restreintes.
        </p>
      </LegalSection>

      <LegalSection title="9. Droit applicable et modifications">
        <p>
          Ces conditions sont soumises au droit français. En cas de litige, écris-nous
          d&apos;abord pour chercher une solution amiable. Tu conserves les droits et
          les recours que te donne la loi de ton pays de résidence. Si ces conditions
          changent de façon importante, nous te préviendrons dans l&apos;application.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
