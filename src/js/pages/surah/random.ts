import { Locale } from 'lib/Locale';

(function () {
  const surahId: number = Math.ceil(Math.random() * 114);
  const locale = Locale(window);
  const el: HTMLElement = document.querySelector('.surah-id-to-slug');
  const slugs = JSON.parse(el.innerText);
  location.replace(`/${locale.fromPath()}/${slugs[surahId]}`);
})();
