import postman, { item } from "postman";

(function () {
  const doc = document.documentElement;
  const locale = doc.lang;
  const { surahId } = document.querySelector<HTMLElement>(".root")!.dataset;

  /* Postman */
  const container = document.querySelector(".postman.loader")!;
  const progressBar = container.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = container.querySelector(".percentage")!;
  const stylesheet = document.querySelector(".css.postman")!;

  postman(
    item.script("/js/main/surah-stream.js"),
    item.css("/css/main/surah-stream.css"),
    item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    item.font("Mada Regular", "url(/fonts/mada-regular.ttf"),
    item.json(`/json/${locale}/${surahId}/info.json`, { className: "json surahinfo" }),
    item.json(`/json/${locale}/${surahId}/surah.json`, { className: "json surah" }),
    item.json(`/json/durations/${surahId}.json`, { className: "json durations" }),
    item.progress((percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = `${percent.toFixed(0)}%`;
    }),
  )
    .fetch()
    .then(pkg => {
      stylesheet.remove();
      container.remove();
      pkg.fonts.forEach(f => document.fonts.add(f));
      pkg.css.forEach(s => document.head.appendChild(s));
      pkg.json.forEach(o => document.body.appendChild(o));
      pkg.scripts.forEach(s => document.body.removeChild(document.body.appendChild(s)));
    });
})();
