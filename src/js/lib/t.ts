import type { TLocale } from "Quran";

type PhraseMap<T> = {
  [key: string]: undefined | string | PhraseMap<T>;
};

export type TFunction = (locale: TLocale, key: string) => string;

export function T(phrases: PhraseMap<string>): TFunction {
  return function (locale: TLocale, key: string) {
    const path = key.split(".");
    const phrase = path.reduce(
      (o, k) => (typeof o === "object" ? o[k] : o),
      phrases[locale.name],
    );
    return typeof phrase === "string" ? phrase : key;
  };
}

export function formatNumber(locale: TLocale | string, num: number, options = {}): string {
  const name = (() => {
    if (typeof locale === "string") {
      return locale;
    } else {
      return locale.name;
    }
  })();
  const numl = name === "ar" ? "ar-SA" : name;
  return new Intl.NumberFormat(numl, {
    maximumFractionDigits: 1,
    ...options,
  }).format(num);
}
