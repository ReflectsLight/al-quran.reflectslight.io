import type { TLocale } from "Quran";

type PhraseMap<T> = {
  [key: string]: undefined | string | PhraseMap<T>;
};

export type TFunction = (locale: TLocale, key: string) => string;

export function i18n(json: string): TFunction {
  const phrases: PhraseMap<string> = JSON.parse(json);
  return function (locale: TLocale, key: string) {
    const path = key.split(".");
    const phrase = path.reduce(
      (o, k) => (typeof o === "object" ? o[k] : o),
      phrases[locale],
    );
    return typeof phrase === "string" ? phrase : key;
  };
}

export function formatNumber(number: number, locale: TLocale): string {
  const numLocale = locale === "ar" ? "ar-SA" : locale;
  const options = { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(numLocale, options).format(number);
}
