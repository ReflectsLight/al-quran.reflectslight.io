import packet, { item } from 'packet';

(function() {
  const parent: HTMLElement = document.querySelector('.webpackage.loader')!;
  const progressBar: HTMLProgressElement = parent.querySelector('progress')!;
  const progressNumber: HTMLSpanElement = parent.querySelector('.percentage')!;
  const inlineStyle: HTMLStyleElement = document.querySelector('.css.webpackage')!;
  const { locale, surahId } = document.querySelector<HTMLElement>('.root')!.dataset;

  packet(
    item.script('/js/pages/surah/stream.js'),
    item.css('/css/pages/surah/strean.css'),
    item.image('/images/moon,svg'),
    item.image('/images/leaf.svg'),
    item.json(`/${locale}/${surahId}/surah.json`),
    item.font('Kanit Regular', 'url(/fonts/kanit-regular.ttf)'),
    item.font('Vazirmatn Regular', 'url(/fonts/vazirmatn-regular.ttf)'),
    item.font('Roboto Mono Regular', 'url(/fonts/roboto-mono-regular.ttf)'),
    item.progress((percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = `${percent.toFixed(0)}%`;
    })
  ).fetch()
    .then((pkg) => {
      inlineStyle.remove();
      parent.remove();
      pkg.fonts.forEach((f) => document.fonts.add(f));
      pkg.css.forEach((s) => document.head.appendChild(s));
      pkg.json.forEach((o) => document.body.appendChild(o));
      pkg.scripts.forEach((s) => document.body.appendChild(s));
    });
})();
