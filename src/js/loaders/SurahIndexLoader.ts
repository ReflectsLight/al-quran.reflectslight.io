import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";

(function () {
  const docel = document.documentElement;
  const loader: HTMLElement = docel.querySelector(".postman.loader")!;
  const style: HTMLStyleElement = docel.querySelector(".css.postman")!;
  const progressBar: HTMLProgressElement = loader.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = loader.querySelector(".percentage")!;
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
    }
    return f;
  })();

  postman(
    item.script(`/js/main/vendor.js?v=${rev}`, { id: "0" }),
    item.script(`/js/main/surah-index.js?v=${rev}`, { id: "1" }),
    ...fonts,
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
      pkg.scripts
        .sort((a, b) => Number(a.id) - Number(b.id))
        .forEach((s) => {
          document.body.removeChild(document.body.appendChild(s));
        });
    });
})();
