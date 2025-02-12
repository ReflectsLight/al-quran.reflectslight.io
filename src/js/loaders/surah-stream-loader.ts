import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(function () {
  const doc = document.documentElement;
  const rev = doc.querySelector("meta[name='revision']")!.getAttribute("content")!;
  const { surahId } = doc.querySelector<HTMLElement>(".app.mount")!.dataset;

  function getFonts() {
    return [
      item.font("Cairo Regular", "url(/fonts/cairo-regular.ttf)"),
      item.font("Noto Sans", "url(/fonts/NotoSans-VariableFont_wdth,wght.ttf)"),
      doc.dir === "rtl" ? item.font("Cairo Bold", "url(/fonts/cairo-bold.ttf)") : null,
      doc.dir === "rtl" ? item.font("Amiri Regular", "url(/fonts/amiri-regular.ttf)") : null,
    ].filter((i) => !!i);
  }

  function deliver() {
    return postman(
      ...getFonts(),
      item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
      item.script(`/js/main/surah-stream.js?v=${rev}`, { id: "1" }),
      item.json(`/json/${doc.lang}/${surahId}/index.json?v=${rev}`, {
        className: "json surah",
      }),
      item.progress((percent: number) => {
        const main = doc.querySelector(".postman.main")!;
        const bar = main.querySelector("progress")!;
        const num: HTMLSpanElement = main.querySelector(".percentage")!;
        bar.value = percent;
        num.innerText = formatNumber(doc.lang, Number(percent.toFixed(0)));
      }),
    ).deliver();
  }

  async function unpack() {
    const delivery = await deliver();
    const main = doc.querySelector(".postman.main")!;
    const css = doc.querySelector(".postman.css")!;
    [main, css].forEach((el) => el.remove());
    delivery.fonts.forEach((f) => document.fonts.add(f));
    delivery.css.forEach((s) => document.head.appendChild(s));
    delivery.json.forEach((o) => document.body.appendChild(o));
    delivery.scripts
      .sort((a, b) => Number(a.id) - Number(b.id))
      .forEach((s) => {
        document.body.removeChild(document.body.appendChild(s));
      });
  }
  unpack();
})();
