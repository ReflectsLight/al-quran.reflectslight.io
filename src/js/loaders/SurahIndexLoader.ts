import postman, { item } from "postman";
import { formatNumber } from "~/lib/t";
import type { TLocale } from "Quran";

(function () {
  const doc = document.documentElement;
  const locale: TLocale = {
    name: doc.lang,
    direction: doc.dir as "rtl" | "ltr",
    displayName: ""
  };

  /* Postman */
  const container: HTMLElement = document.querySelector(".postman.loader")!;
  const progressBar: HTMLProgressElement = container.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = container.querySelector(".percentage")!;
  const stylesheet: HTMLStyleElement = document.querySelector(".css.postman")!;

  postman(
    item.script("/js/main/surah-index.js"),
    item.css("/css/main/surah-index.css"),
    item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    item.font("Mada Regular", "url(/fonts/mada-regular.ttf"),
    item.progress((percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = `${formatNumber(locale, Number(percent.toFixed(0)))}%`;
    }),
  )
    .fetch()
    .then(pkg => {
      stylesheet.remove();
      container.remove();
      pkg.fonts.forEach(f => document.fonts.add(f));
      pkg.css.forEach(s => document.head.appendChild(s));
      pkg.scripts.forEach(s => document.body.removeChild(document.body.appendChild(s)));
    });
})();
