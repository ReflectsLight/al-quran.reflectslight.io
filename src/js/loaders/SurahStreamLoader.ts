import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(async function () {
  const doc = document.documentElement;
  const main = doc.querySelector(".postman.main")!;
  const css = doc.querySelector(".postman.css")!;
  const { surahId } = doc.querySelector<HTMLElement>(".app.mount")!.dataset;
  const rev = doc
    .querySelector("meta[name='revision']")!
    .getAttribute("content")!;

  function getFonts() {
    return [
      item.font("Cairo Regular", "url(/fonts/cairo-regular.ttf)"),
      item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
      doc.dir === "rtl" ? item.font("Cairo Bold", "url(/fonts/cairo-bold.ttf)") : null,
      doc.dir === "rtl" ? item.font("Amiri Regular", "url(/fonts/amiri-regular.ttf)") : null,
    ].filter((i) => !!i);
  }

  const parcel = await postman(
    item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
    item.script(`/js/main/surah-stream.js?v=${rev}`, { id: "1" }),
    ...getFonts(),
    item.json(`/json/${doc.lang}/${surahId}/index.json?v=${rev}`, {
      className: "json surah",
    }),
    item.progress((percent: number) => {
      const bar = main.querySelector("progress")!;
      const num: HTMLSpanElement = main.querySelector(".percentage")!;
      bar.value = percent;
      num.innerText = formatNumber(doc.lang, Number(percent.toFixed(0)));
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
