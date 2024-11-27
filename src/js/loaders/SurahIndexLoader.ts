import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(function () {
  const doc = document.documentElement;
  const rev = doc.querySelector("meta[name='revision']")!.getAttribute("content")!;

  function getFonts() {
    return [
      item.font("Cairo Regular", "url(/fonts/cairo-regular.ttf)"),
      item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
      doc.dir === "rtl" ? item.font("Cairo Bold", "url(/fonts/cairo-bold.ttf)") : null,
    ].filter((i) => !!i);
  }

  function deliver() {
    return postman(
      ...getFonts(),
      item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
      item.script(`/js/main/surah-index.js?v=${rev}`, { id: "1" }),
      item.progress((percent: number) => {
        const main: HTMLElement = doc.querySelector(".postman.main")!;
        const bar: HTMLProgressElement = main.querySelector("progress")!;
        const num: HTMLSpanElement = main.querySelector(".percentage")!;
        bar.value = percent;
        num.innerText = formatNumber(doc.lang, Number(percent.toFixed(0)));
      }),
    ).deliver();
  }

  async function unpack() {
    const delivery = await deliver();
    const main: HTMLElement = doc.querySelector(".postman.main")!;
    const css: HTMLStyleElement = doc.querySelector(".postman.css")!;
    [main, css].forEach((el) => el.remove());
    delivery.fonts.forEach((f) => document.fonts.add(f));
    delivery.css.forEach((s: HTMLElement) => document.head.appendChild(s));
    delivery.scripts
      .sort((a, b) => Number(a.id) - Number(b.id))
      .forEach((s) => {
        document.body.removeChild(document.body.appendChild(s));
      });
  }
  unpack();
})();
