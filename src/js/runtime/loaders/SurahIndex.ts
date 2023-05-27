import WebPackage from '@/lib/WebPackage';

(function() {
  const parent: HTMLElement = document.querySelector('.webpackage.loader')!;
  WebPackage({
    scripts: ['/js/index.js'],
    stylesheets: ['/css/index.css'],
    images: ['/images/moon.svg', '/images/leaf.svg'],
    others: [],
    fonts: [
      ['Kanit Regular', 'url(/fonts/kanit-regular.ttf)'],
      ['Vazirmatn Regular', 'url(/fonts/vazirmatn-regular.ttf)'],
      ['Roboto Mono Regular', 'url(/fonts/roboto-mono-regular.ttf)']
    ],
    onprogress: (percent: number) => {
      const progressBar: HTMLProgressElement = parent.querySelector('progress')!;
      const progressNumber: HTMLSpanElement = parent.querySelector('.percentage')!;
      progressBar.value = percent;
      progressNumber.innerText = `${percent.toFixed(0)}%`;
    }
  }).fetch()
    .then((pkg) => {
      const inlineStyle: HTMLStyleElement = document.querySelector('.webpackage.loader')!;
      inlineStyle.remove();
      parent.remove();
      pkg.fonts.forEach((f) => document.fonts.add(f));
      pkg.stylesheets.forEach((s) => document.head.appendChild(s));
      pkg.others.forEach((o) => document.body.appendChild(o));
      pkg.scripts.forEach((s) => document.body.appendChild(s));
    });
})();
