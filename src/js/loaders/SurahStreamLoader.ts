import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(function () {
  const doc = document.documentElement;
  const loader = doc.querySelector(".postman.loader")!;
  const style = doc.querySelector(".css.postman")!;
  const progressBar = loader.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = loader.querySelector(".percentage")!;
  const { surahId } = document.querySelector<HTMLElement>(".root")!.dataset;
  const rev = doc
    .querySelector("meta[name='revision']")!
    .getAttribute("content")!;
  const fonts = (() => {
    if (doc.dir === "rtl") {
      return [
        item.font("Cairo Regular", "url(/fonts/cairo-regular.ttf)"),
        item.font("Cairo Bold", "url(/fonts/cairo-bold.ttf)"),
        item.font("Amiri Regular", "url(/fonts/amiri-regular.ttf)"),
      ];
    } else {
      return [item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)")];
    }
  })();

  postman(
    item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
    item.script(`/js/main/surah-stream.js?v=${rev}`, { id: "1" }),
    ...fonts,
    /* eslint-disable */
    item.json(`/json/${doc.lang}/${surahId}/info.json?v=${rev}`, { className: "json surahinfo" }),
    item.json(`/json/${doc.lang}/${surahId}/surah.json?v=${rev}`, { className: "json surah" }),
    item.json(`/json/durations/${surahId}.json?v=${rev}`, { className: "json durations" }),
    /* eslint-enable */
    item.progress((percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = formatNumber(
        doc.lang,
        Number(percent.toFixed(0)),
      );
    }),
  )
    .fetch()
    .then((pkg) => {
      [loader, style].forEach((el) => el.remove());
      pkg.fonts.forEach((f) => document.fonts.add(f));
      pkg.css.forEach((s) => document.head.appendChild(s));
      pkg.json.forEach((o) => document.body.appendChild(o));
      pkg.scripts
        .sort((a, b) => Number(a.id) - Number(b.id))
        .forEach((s) => {
          document.body.removeChild(document.body.appendChild(s));
        });
    });
})();
