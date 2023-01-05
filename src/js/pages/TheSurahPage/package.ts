import WebPackage from 'lib/WebPackage';

(function() {
  const parent: HTMLElement = document.querySelector('.webpackage.loader');
  const progressBar: HTMLProgressElement = parent.querySelector('progress');
  const progressNumber: HTMLSpanElement = parent.querySelector('.percentage');
  const inlineStyle: HTMLStyleElement = document.querySelector('style.webpackage');
  const { locale, surahId } = document.querySelector<HTMLElement>('.root-box').dataset;

  WebPackage({
    scripts: ['/js/pages/surah.js'],
    stylesheets: ['/css/surah.css'],
    images: ['/images/moon.svg', '/images/leaf.svg'],
    others: [`/${locale}/${surahId}/surah.json`],
    fonts: [
      ['Kanit Regular', 'url(/fonts/kanit-regular.ttf)'],
      ['Vazirmatn Regular', 'url(/fonts/vazirmatn-regular.ttf)'],
      ['Roboto Mono Regular', 'url(/fonts/roboto-mono-regular.ttf)']
    ],
    onprogress: (percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = `${percent.toFixed(0)}%`;
    }
  }).fetch()
    .then((pkg) => {
      inlineStyle.remove();
      parent.remove();
      pkg.fonts.forEach((f) => document.fonts.add(f));
      pkg.stylesheets.forEach((s) => document.head.appendChild(s));
      pkg.others.forEach((o) => document.body.appendChild(o));
      pkg.scripts.forEach((s) => document.body.appendChild(s));
    });
})();
