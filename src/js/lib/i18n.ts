import { Locale } from 'lib/Quran';
type Strings = 'decimal' | 'surah' | 'ayah' | 'comma';

const sTable: Record<Locale, Record<Strings, string>> = {
  en: {
    decimal: '.',
    surah: 'Surah',
    ayah: 'Ayah',
    comma: ','
  },
  ar: {
    decimal: '\u{066B}',
    surah: '\u{633}\u{648}\u{631}\u{629}',
    ayah: '\u{622}\u{64a}\u{629}',
    comma: '\u{60c}'
  }
};

/**
 * The read time baseline - as a number milliseconds -
 * that all Ayah share, regardless of locale.
 */
export const DelayBaseLine = 2000;

/**
 * The read time for each word in an Ayah,
 * relative to the active locale.
 */
export const DelayPerWord: Record<Locale, number> = {
  en: 500,
  ar: 750
};

export function numbers (locale: Locale) {
  return function(number: number): string {
    return Number(number).toLocaleString(locale);
  };
}

export function strings (locale: Locale) {
  return function(key: Strings): string {
    const table = sTable[locale];
    return table[key];
  };
}

export function numberToDecimal(number: number, locale: Locale): string {
  return number.toLocaleString(locale, { maximumFractionDigits: 1 })
               .split(/([^\d])/)
               .join(' ');
}
