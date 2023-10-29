import postman, { item } from "postman";

(function () {
  const parent: HTMLElement = document.querySelector(".postman.loader")!;
  const progressBar: HTMLProgressElement = parent.querySelector("progress")!;
  const progressNumber: HTMLSpanElement = parent.querySelector(".percentage")!;
  const inlineStyle: HTMLStyleElement = document.querySelector(".css.postman")!;

  postman(
    item.script("/js/surah-index.js"),
    item.css("/css/surah-index.css"),
    item.font("Kanit Regular", "url(/fonts/kanit-regular.ttf)"),
    item.font("Mada Regular", "url(/fonts/mada-regular.ttf"),
    item.font("Amiri Quran Regular", "url(/fonts/amiri-quran-regular.ttf"),
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
      pkg.scripts.forEach(s =>
        document.body.removeChild(document.body.appendChild(s)),
      );
    });
})();
