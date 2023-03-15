import WebPackage from 'lib/WebPackage';

(function() {
  const parent: HTMLElement = document.querySelector('.webpackage.loader')!;
  const progressBar: HTMLProgressElement = parent.querySelector('progress')!;
  const progressNumber: HTMLSpanElement = parent.querySelector('.percentage')!;
  const inlineStyle: HTMLStyleElement = document.querySelector('.css.webpackage')!;

  WebPackage({
    scripts: ['/js/pages/surah/index.js'],
    stylesheets: ['/css/pages/surah/index.css'],
    images: ['/images/moon.svg', '/images/leaf.svg'],
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
