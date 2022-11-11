import { getLocale } from "lib/locales";

(function () {
  let surahId: number = Math.ceil(Math.random() * 114);
  const locale: string = getLocale();

  const day = new Date().getDay();
  if (day === 5) surahId = 18;

  location.replace(`/${locale}/${surahId}`);
})();
