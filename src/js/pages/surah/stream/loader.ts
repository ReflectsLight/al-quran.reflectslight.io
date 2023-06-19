import Packet from 'packet';
import type { PacketTarget } from 'packet';

(function() {
  const parent: HTMLElement = document.querySelector('.webpackage.loader')!;
  const progressBar: HTMLProgressElement = parent.querySelector('progress')!;
  const progressNumber: HTMLSpanElement = parent.querySelector('.percentage')!;
  const inlineStyle: HTMLStyleElement = document.querySelector('.css.webpackage')!;
  const { locale, surahId } = document.querySelector<HTMLElement>('.root')!.dataset;

  Packet({
    scripts: ['/js/pages/surah/stream.js'],
    stylesheets: ['/css/pages/surah/stream.css'],
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
    .then((pkg: PacketTarget) => {
      inlineStyle.remove();
      parent.remove();
      pkg.fonts.forEach((f) => document.fonts.add(f));
      pkg.stylesheets.forEach((s) => document.head.appendChild(s));
      pkg.others.forEach((o) => document.body.appendChild(o));
      pkg.scripts.forEach((s) => document.body.appendChild(s));
    });
})();
