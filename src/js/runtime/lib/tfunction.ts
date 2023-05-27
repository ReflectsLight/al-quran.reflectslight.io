import * as Quran from "@/lib/Quran";

export default function(tdata: string) {
  const table = JSON.parse(tdata);
  return (key: string) => table[key];
}

export function formatNumber(number: number, locale: Quran.Locale): string {
  const numLocale = locale === 'ar' ? 'ar-SA' : locale;
  const options = { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(numLocale, options)
               .format(number)
               .split(/([^\d])/)
               .join(' ');
}
