import { Locale } from 'lib/Locale';

(function () {
  const day = new Date().getDay();
  const surahId: number = day === 5 ? 18 : Math.ceil(Math.random() * 114);
  const locale = Locale(window);
  const el: HTMLElement = document.querySelector('.surah-id-to-slug');
  const slugs = JSON.parse(el.innerText);
  location.replace(`/${locale.fromPath() || locale.fromBrowser()}/${slugs[surahId]}`);
})();
