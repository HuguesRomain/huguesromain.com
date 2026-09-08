import { corpusEn } from "@/content/corpus.en";
import { corpusFr } from "@/content/corpus.fr";
import type { Locale } from "@/content/types";

export async function getContext(
  _question: string,
  locale: Locale,
): Promise<string> {
  return locale === "fr" ? corpusFr : corpusEn;
}
