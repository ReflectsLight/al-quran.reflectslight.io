import * as Quran from 'lib/Quran';

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
  const numLocale = locale === 'ar' ? 'ar-SA' : locale;
  const options = { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(numLocale, options)
               .format(number)
               .split(/([^\d])/)
               .join(' ');
}
