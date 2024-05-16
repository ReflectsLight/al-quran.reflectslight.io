import { Quran, TLocale } from "Quran";
(function () {
  const defaultl = "en";
  const locale = navigator.languages
    .map(s => s.slice(0, 2).toLowerCase())
    .find(s => Quran.locales.includes(s as TLocale)) || defaultl;
  location.replace(`/${locale}/`);
})();
