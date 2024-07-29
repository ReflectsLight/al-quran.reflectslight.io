import { Quran } from "Quran";
(function () {
  const defaultl = "en";
  const locales = Quran.locales.map((l) => l.name);
  const locale =
    navigator.languages
      .map((s) => s.slice(0, 2).toLowerCase())
      .find((s) => locales.includes(s)) || defaultl;
  location.replace(`/${locale}/`);
})();
