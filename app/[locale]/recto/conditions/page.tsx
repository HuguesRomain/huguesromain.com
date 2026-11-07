import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
} from "@/components/recto/legal-page";
import { isLocale } from "@/content/get-profile";
import { CONTACT_EMAIL, PERSON_NAME } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/recto/conditions">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return locale === "fr"
    ? rectoMetadata(
        locale,
        "conditions",
        "Conditions d'utilisation",
        "Les conditions d'utilisation de l'application Recto AI et de l'abonnement Recto AI+.",
      )
    : rectoMetadata(
        locale,
        "conditions",
        "Terms of Use",
        "The terms of use for the Recto AI app and the Recto AI+ subscription.",
      );
}

export default async function RectoTerms({
  params,
}: PageProps<"/[locale]/recto/conditions">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale === "fr" ? <TermsFr /> : <TermsEn />;
}

function TermsFr() {
  return (
    <LegalPage
      locale="fr"
      title="Conditions d'utilisation"
      intro="Ces conditions encadrent ton utilisation de Recto AI, l'application qui t'explique les passages de tes livres papier."
      updated="7 novembre 2026"
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
          elle te suit sur tes appareils.
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

function TermsEn() {
  return (
    <LegalPage
      locale="en"
      title="Terms of Use"
      intro="These terms govern your use of Recto AI, the app that explains passages from your paper books."
      updated="November 7, 2026"
    >
      <LegalSection title="1. Publisher">
        <p>
          Recto AI is published by {PERSON_NAME}, in Nice, France. Contact:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="2. The service">
        <p>
          Recto reads the page you photograph on your phone, uses artificial
          intelligence to explain the passage you select, lets you ask questions about
          that passage and organizes your passages by book in your library.
        </p>
        <p>
          An account is optional: without one, your library stays on your phone and
          disappears if you delete the app; with one, it follows you across your
          devices.
        </p>
      </LegalSection>

      <LegalSection title="3. Recto AI+ subscription">
        <ul>
          <li>
            <strong>Plans:</strong> annual or weekly, at the price shown in the app
            before purchase.
          </li>
          <li>
            <strong>Free trial:</strong> the annual plan may include a 3-day trial if
            you are eligible. Unless you cancel before the trial ends, the annual price
            is charged.
          </li>
          <li>
            <strong>Renewal:</strong> the subscription renews automatically for the same
            duration unless you cancel at least 24 hours before the end of the current
            period.
          </li>
          <li>
            <strong>Cancellation:</strong> from your Apple account settings. Deleting
            the app or your Recto account does not cancel the subscription.
          </li>
          <li>
            <strong>Payment and refunds:</strong> Apple collects the payment and handles
            refund requests at{" "}
            <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.
          </li>
          <li>
            <strong>Fair use:</strong> to protect the service, daily limits apply, for
            example 300 explanations per day.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. AI answers">
        <p>
          Explanations are generated automatically and may contain errors. They help you
          understand a text, but do not replace the work itself or professional advice.
          Check whatever matters to you, and report a problematic answer from the app or
          by email.
        </p>
      </LegalSection>

      <LegalSection title="5. Your content and good practices">
        <p>
          Your passages and questions remain yours. You authorize us to process them
          solely to operate the service, as described in the{" "}
          <Link href="/en/recto/confidentialite">Privacy Policy</Link>.
        </p>
        <p>
          Use Recto for personal purposes. Do not use it to distribute protected works,
          circumvent the service or produce illegal content. In the event of serious
          abuse, access may be suspended.
        </p>
      </LegalSection>

      <LegalSection title="6. Availability and liability">
        <p>
          The service may be interrupted for maintenance or may change. Nothing in these
          terms limits the rights the law guarantees you as a consumer, including the
          legal guarantee of conformity.
        </p>
      </LegalSection>

      <LegalSection title="7. Account deletion">
        <p>
          You can delete your account at any time in the app&apos;s Settings. Your books,
          passages and conversations are then erased. If you use Recto without an
          account, “Erase my data” does the same on your phone.
        </p>
      </LegalSection>

      <LegalSection title="8. Apple">
        <p>
          These terms bind you to {PERSON_NAME}, not to Apple, which is not responsible
          for the app or its content, its maintenance, its support or claims relating to
          it. If the app fails to meet an applicable warranty, you may notify Apple,
          which may refund its purchase price; Apple has no other warranty obligation.
          Apple and its subsidiaries are third-party beneficiaries of these terms and may
          enforce them. You represent that you do not reside in a country subject to a
          U.S. embargo and that you are not on any U.S. list of prohibited or restricted
          parties.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing law and changes">
        <p>
          These terms are governed by French law. In the event of a dispute, write to us
          first to seek an amicable solution. You keep the rights and remedies given to
          you by the law of your country of residence. If these terms change
          significantly, we will notify you in the app.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
