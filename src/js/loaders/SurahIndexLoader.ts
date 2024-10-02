import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(function () {
  const doc = document.documentElement;
  const loader: HTMLElement = doc.querySelector(".postman.loader")!;
  const style: HTMLStyleElement = doc.querySelector(".css.postman")!;
  const progressBar: HTMLProgressElement = loader.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = loader.querySelector(".percentage")!;
  const rev = doc
    .querySelector("meta[name='revision']")!
    .getAttribute("content")!;
  const fonts = (() => {
    if (doc.dir === "rtl") {
      return [
        item.font("Cairo Regular", "url(/fonts/cairo-regular.ttf)"),
        item.font("Cairo Bold", "url(/fonts/cairo-bold.ttf)"),
      ];
    } else {
      return [item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)")];
    }
  })();

  postman(
    item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
    item.script(`/js/main/surah-index.js?v=${rev}`, { id: "1" }),
    ...fonts,
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
      pkg.scripts
        .sort((a, b) => Number(a.id) - Number(b.id))
        .forEach((s) => {
          document.body.removeChild(document.body.appendChild(s));
        });
    });
})();
