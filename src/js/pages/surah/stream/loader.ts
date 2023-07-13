import postman, { item } from 'postman';
import * as Quran from 'lib/Quran';

(function() {
  const parent: HTMLElement = document.querySelector('.postman.loader')!;
  const progressBar: HTMLProgressElement = parent.querySelector('progress')!;
  const progressNumber: HTMLSpanElement = parent.querySelector('.percentage')!;
  const inlineStyle: HTMLStyleElement = document.querySelector('.css.postman')!;
  const { locale, surahId } = document.querySelector<HTMLElement>('.root')!.dataset;
  const reciters = JSON.parse(document.querySelector<HTMLElement>('.json.reciters')!.innerText);

  postman(
    item.script('/js/pages/surah/stream.js'),
    item.css('/css/pages/surah/stream.css'),
    item.image('/images/moon.svg'),
    item.image('/images/leaf.svg'),
    item.font('Kanit Regular', 'url(/fonts/kanit-regular.ttf)'),
    item.font('Vazirmatn Regular', 'url(/fonts/vazirmatn-regular.ttf)'),
    item.font('Roboto Mono Regular', 'url(/fonts/roboto-mono-regular.ttf)'),
    item.json(`/${locale}/${surahId}/surah.json`, { className: 'surah' }),
    ...reciters.map((reciter: Quran.Reciter) => {
      const { url: baseUrl } = reciter;
      return item.json(
        `${baseUrl}/time_slots/${surahId}.json`,
        { className: `reciter time-slots ${reciter.id}` }
      );
    }),
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
