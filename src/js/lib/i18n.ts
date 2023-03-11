import * as Quran from 'lib/Quran';

/**
 * The read time baseline - as a number milliseconds -
 * that all Ayah share, regardless of locale.
 */
export const DelayBaseLine = 2000;

/**
 * The read time for each word in an Ayah,
 * relative to the active locale.
 */
export const DelayPerWord: Record<Quran.Locale, number> = {
  en: 500,
  ar: 750
};

type PhraseMap<T> = {
  [key: string]: undefined | string | PhraseMap<T>
};

export type TFunction = (locale: Quran.Locale, key: string) => string;

export function i18n(json: string): TFunction {
  const phrases: PhraseMap<string> = JSON.parse(json);
  return function (locale: Quran.Locale, key: string) {
    const path = key.split('.');
    const phrase = path.reduce(
      (o, k) => typeof(o) === 'object' ? o[k] : o,
      phrases[locale]
    );
    return typeof phrase === 'string' ? phrase : key;
  };
}

export function formatNumber(number: number, locale: Quran.Locale): string {
  return number.toLocaleString(locale, { maximumFractionDigits: 1 })
               .split(/([^\d])/)
               .join(' ');
}
