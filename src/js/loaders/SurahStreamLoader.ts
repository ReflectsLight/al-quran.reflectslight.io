import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(function () {
  const docel = document.documentElement;
  const loader = docel.querySelector(".postman.loader")!;
  const style = docel.querySelector(".css.postman")!;
  const progressBar = loader.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = loader.querySelector(".percentage")!;
  const { surahId } = document.querySelector<HTMLElement>(".root")!.dataset;
  const rev = docel
    .querySelector("meta[name='revision']")!
    .getAttribute("content")!;
  const fonts = (() => {
    const f = [
      item.font("Cairo Regular", "url(/fonts/cairo-regular.ttf)"),
      item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    ];
    if (docel.dir === "rtl") {
      f.push(item.font("Cairo Bold", "url(/fonts/cairo-bold.ttf)"));
      f.push(item.font("Amiri Regular", "url(/fonts/amiri-regular.ttf)"));
    }
    return f;
  })();

  postman(
    item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
    item.script(`/js/main/surah-stream.js?v=${rev}`, { id: "1" }),
    ...fonts,
    /* eslint-disable */
    item.json(`/json/${docel.lang}/${surahId}/info.json?v=${rev}`, { className: "json surahinfo" }),
    item.json(`/json/${docel.lang}/${surahId}/surah.json?v=${rev}`, { className: "json surah" }),
    item.json(`/json/durations/${surahId}.json?v=${rev}`, { className: "json durations" }),
    /* eslint-enable */
    item.progress((percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = formatNumber(
        docel.lang,
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
