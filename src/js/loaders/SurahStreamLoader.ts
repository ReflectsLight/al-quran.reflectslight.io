import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";
import type { TLocale } from "Quran";

(function () {
  const doc = document.documentElement;
  const rev = doc.querySelector("meta[name='revision']")!.getAttribute("content")!;
  const { surahId } = document.querySelector<HTMLElement>(".root")!.dataset;
  const locale: TLocale = {
    name: doc.lang,
    direction: doc.dir as "rtl" | "ltr",
    displayName: "",
  };

  /* Postman */
  const loader = doc.querySelector(".postman.loader")!;
  const stylesheet = doc.querySelector(".css.postman")!;
  const progressBar = loader.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = loader.querySelector(".percentage")!;

  postman(
    item.script(`/js/main/surah-stream.js?v=${rev}`),
    item.css(`/css/main/surah-stream.css?v=${rev}`),
    item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    item.font("Mada Regular", "url(/fonts/mada-regular.ttf"),
    item.json(`/json/${doc.lang}/${surahId}/info.json?v=${rev}`, {
      className: "json surahinfo",
    }),
    item.json(`/json/${doc.lang}/${surahId}/surah.json?v=${rev}`, {
      className: "json surah",
    }),
    item.json(`/json/durations/${surahId}.json?v=${rev}`, {
      className: "json durations",
    }),
    item.progress((percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = formatNumber(locale, Number(percent.toFixed(0)));
    }),
  )
    .fetch()
    .then(pkg => {
      stylesheet.remove();
      loader.remove();
      pkg.fonts.forEach(f => document.fonts.add(f));
      pkg.css.forEach(s => document.head.appendChild(s));
      pkg.json.forEach(o => document.body.appendChild(o));
      pkg.scripts.forEach(s => document.body.removeChild(document.body.appendChild(s)));
    });
})();
