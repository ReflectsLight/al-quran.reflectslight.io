(function () {
  const [locale, surahId] = location.pathname
    .split('/')
    .filter(function (s) { return s.length; })
    .slice(-2);
  const el: HTMLElement = document.querySelector('.surah-id-to-slug')!;
  const slugs = JSON.parse(el.innerText);
  const path = ['', locale, slugs[surahId]].join('/');
  location.replace([path, location.search].join(''));
})();