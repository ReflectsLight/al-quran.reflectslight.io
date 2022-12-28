import { Locale } from 'lib/Quran';
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Strings = 'decimal' | 'surah' | 'ayah' | 'comma';

const nTable: Record<Locale, Record<Digit, string>> = {
  en: {
   0: '0', 1: '1', 2: '2',
   3: '3', 4: '4', 5: '5',
   6: '6', 7: '7', 8: '8',
   9: '9'
  },
  ar: {
    0: '\u{0660}', 1: '\u{0661}', 2: '\u{0662}',
    3: '\u{0663}', 4: '\u{0664}', 5: '\u{0665}',
    6: '\u{0666}', 7: '\u{0667}', 8: '\u{0668}',
    9: '\u{0669}'
  }
};

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
  return function(keys: string | string[]): string {
    const table = nTable[locale];
    return [...keys].map((k: Digit) => table[k]).join('');
  };
}

export function strings (locale: Locale) {
  return function(key: Strings): string {
    const table = sTable[locale];
    return table[key];
  };
}

export function numberToDecimal(number: number, locale: Locale): string {
  const decimal = number.toFixed(1);
  const s = strings(locale);
  const n = numbers(locale);
  return decimal.split('.')
                .map((num: Digit) => n(num))
                .join(` ${s('decimal')} `);
}
