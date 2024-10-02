import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(async function () {
  const docel = document.documentElement;
  const main = docel.querySelector(".postman.main")!;
  const css = docel.querySelector(".postman.css")!;
  const { surahId } = docel.querySelector<HTMLElement>(".app.mount")!.dataset;
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

  const parcel = await postman(
    item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
    item.script(`/js/main/surah-stream.js?v=${rev}`, { id: "1" }),
    ...fonts,
    /* eslint-disable */
    item.json(`/json/${docel.lang}/${surahId}/info.json?v=${rev}`, { className: "json surahinfo" }),
    item.json(`/json/${docel.lang}/${surahId}/surah.json?v=${rev}`, { className: "json surah" }),
    item.json(`/json/durations/${surahId}.json?v=${rev}`, { className: "json durations" }),
    /* eslint-enable */
    item.progress((percent: number) => {
      const bar = main.querySelector("progress")!;
      const num: HTMLSpanElement = main.querySelector(".percentage")!;
      bar.value = percent;
      num.innerText = formatNumber(docel.lang, Number(percent.toFixed(0)));
    }),
  ).deliver();
  [main, css].forEach((el) => el.remove());
  parcel.fonts.forEach((f) => document.fonts.add(f));
  parcel.css.forEach((s) => document.head.appendChild(s));
  parcel.json.forEach((o) => document.body.appendChild(o));
  parcel.scripts
    .sort((a, b) => Number(a.id) - Number(b.id))
    .forEach((s) => {
      document.body.removeChild(document.body.appendChild(s));
    });
})();
