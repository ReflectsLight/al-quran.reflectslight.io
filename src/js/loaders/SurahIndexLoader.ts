import postman, { item } from "postman";

(function () {
  const parent: HTMLElement = document.querySelector(".postman.loader")!;
  const progressBar: HTMLProgressElement = parent.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = parent.querySelector(".percentage")!;
  const inlineStyle: HTMLStyleElement = document.querySelector(".css.postman")!;

  postman(
    item.script("/js/pages/surah-index.js"),
    item.css("/css/pages/surah-index.css"),
    item.image("/images/moon.svg"),
    item.image("/images/leaf.svg"),
    item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    item.font("Vazirmatn Regular", "url(/fonts/vazirmatn-regular.ttf)"),
    item.font("Roboto Mono Regular", "url(/fonts/roboto-mono-regular.ttf)"),
    item.progress((percent: number) => {
      progressBar.value = percent;
      progressNumber.innerText = `${percent.toFixed(0)}%`;
    }),
  )
    .fetch()
    .then(pkg => {
      inlineStyle.remove();
      parent.remove();
      pkg.fonts.forEach(f => document.fonts.add(f));
      pkg.css.forEach(s => document.head.appendChild(s));
      pkg.scripts.forEach(s => document.body.removeChild(document.body.appendChild(s)));
    });
})();
