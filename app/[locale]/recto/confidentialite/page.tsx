import type { Metadata } from "next";
import {
  LegalPage,
  LegalSection,
  rectoMetadata,
  requireFrench,
} from "@/components/recto/legal-page";
import { CONTACT_EMAIL, PERSON_NAME } from "@/lib/site";

export const metadata: Metadata = rectoMetadata(
  "confidentialite",
  "Politique de confidentialité",
  "Quelles données Recto AI utilise, avec qui elles sont partagées et comment les supprimer.",
);

export default async function RectoPrivacy({
  params,
}: PageProps<"/[locale]/recto/confidentialite">) {
  const { locale } = await params;
  requireFrench(locale, "confidentialite");

  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Ce que Recto AI collecte, pourquoi, avec qui c'est partagé et comment tu gardes la main."
      updated="5 novembre 2026"
    >
      <LegalSection title="L'essentiel">
        <ul>
          <li>La photo d&apos;une page reste sur ton téléphone : seul le texte lu en sort.</li>
          <li>
            Le texte nécessaire aux explications part chez DeepSeek, en Chine,
            uniquement après ton accord.
          </li>
          <li>Pas de publicité, pas de suivi publicitaire, pas de vente de données.</li>
          <li>Tu peux retirer ton accord et supprimer ton compte dans l&apos;application.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Responsable du traitement">
        <p>
          {PERSON_NAME}, Nice, France. Contact :{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées et usages">
        <ul>
          <li>
            <strong>Compte (facultatif) :</strong> adresse e-mail et identifiant de
            connexion (e-mail, Apple ou Google), pour te connecter. Sans compte, une session
            anonyme donne accès à l&apos;IA et à ton abonnement.
          </li>
          <li>
            <strong>Bibliothèque :</strong> titres et auteurs, numéros de page, passages,
            texte de la page, explications, questions et réponses, photos de couverture,
            pour conserver ta lecture. Sans compte, elle reste sur ton téléphone ; avec un
            compte, elle est hébergée pour te suivre sur tes appareils.
          </li>
          <li>
            <strong>Préférences :</strong> ce qui te fait décrocher, tes domaines et tes
            habitudes de lecture, pour adapter les explications.
          </li>
          <li>
            <strong>Abonnement et usage :</strong> état de l&apos;abonnement, produit,
            date d&apos;expiration, historique d&apos;achat et compteurs d&apos;utilisation
            de l&apos;IA, pour donner accès au service et appliquer ses limites.
          </li>
          <li>
            <strong>Données techniques :</strong> la reconnaissance de texte Google ML Kit
            fonctionne sur ton téléphone, mais ce composant déclare collecter des
            données techniques, comme un identifiant d&apos;appareil, des diagnostics, des
            mesures de performance et d&apos;usage.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Ce qui est envoyé à l'IA">
        <p>
          Pour répondre, Recto envoie à <strong>DeepSeek</strong> : le passage, le texte de
          la page, le titre et l&apos;auteur, le numéro de page, ce qui te fait décrocher,
          l&apos;explication précédente, tes questions, l&apos;historique de la discussion,
          tes autres passages gardés dans ce livre et, si tu en prends une, la photo de la
          couverture. Ton e-mail n&apos;est pas envoyé.
        </p>
        <p>
          Évite donc d&apos;écrire des informations personnelles dans tes questions. Rien
          n&apos;est envoyé avant ton accord, que tu peux retirer dans Réglages &gt; Mes
          données. L&apos;IA ne fonctionne plus tant que tu ne l&apos;as pas redonné.
        </p>
      </LegalSection>

      <LegalSection title="Bases légales">
        <p>
          Exécution du contrat pour le compte, la bibliothèque et l&apos;abonnement.
          Consentement pour l&apos;envoi à DeepSeek. Intérêt légitime pour la sécurité et
          la prévention des abus. Obligations légales pour ce que la loi impose de
          conserver.
        </p>
      </LegalSection>

      <LegalSection title="Prestataires et localisation">
        <ul>
          <li>
            <strong>Supabase</strong> : hébergement de la base de données, des couvertures
            et de la connexion, à Paris (Union européenne).
          </li>
          <li>
            <strong>DeepSeek</strong> : génération des réponses, en Chine (
            <a href="https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html">
              politique de DeepSeek
            </a>
            ).
          </li>
          <li>
            <strong>RevenueCat</strong> : gestion des abonnements, aux États-Unis.
          </li>
          <li>
            <strong>Apple et Google</strong> : paiement, connexion si tu la choisis, et
            composants techniques.
          </li>
        </ul>
        <p>
          La Chine ne bénéficie pas d&apos;une décision d&apos;adéquation de la Commission
          européenne : le niveau de protection peut y être inférieur à celui de l&apos;Union
          et des autorités locales peuvent accéder aux données. Cet envoi repose sur ton
          consentement explicite. Ces prestataires ne reçoivent que ce qui est nécessaire à
          leur rôle.
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Tes données restent conservées tant que ton compte existe et sont effacées lors de
          sa suppression dans l&apos;application, couvertures comprises. Si tu t&apos;es
          connecté avec Apple, l&apos;autorisation Apple est aussi révoquée à ce moment-là :
          Apple te demandera une confirmation. Pour effacer les
          données d&apos;achat chez RevenueCat, écris au support. Les prestataires
          appliquent leurs propres durées pour ce qu&apos;ils ont déjà reçu, et certaines
          données d&apos;achat peuvent être conservées pour des raisons légales.
        </p>
      </LegalSection>

      <LegalSection title="Tes droits">
        <p>
          Tu peux demander l&apos;accès, la rectification, l&apos;effacement, la limitation
          ou la portabilité de tes données, t&apos;opposer à certains traitements et retirer
          ton consentement à tout moment. Tu peux aussi exporter tes passages depuis les
          Réglages. Pour exercer tes droits, écris à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Tu peux également saisir
          la <a href="https://www.cnil.fr/fr/plaintes">CNIL</a>.
        </p>
      </LegalSection>

      <LegalSection title="Âge minimum">
        <p>
          Recto s&apos;adresse aux personnes de 15 ans et plus. En dessous, l&apos;accord
          d&apos;un parent ou tuteur est nécessaire.
        </p>
      </LegalSection>

      <LegalSection title="Modifications">
        <p>
          En cas de changement important, notamment de prestataire d&apos;IA, nous te
          préviendrons dans l&apos;application et te redemanderons ton accord si nécessaire.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
