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

export function formatNumber(
  locale: TLocale,
  num: number,
  options = {},
): string {
  const numl = locale.name === "ar" ? "ar-SA" : locale.name;
  return new Intl.NumberFormat(numl, {
    maximumFractionDigits: 1,
    ...options,
  }).format(num);
}
