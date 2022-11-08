import { getLocale } from 'lib/locales';

(function () {
  const surahId: number = Math.ceil(Math.random() * 114);
  const locale: string = getLocale();
  location.replace(`/${locale}/${surahId}`);
})();
