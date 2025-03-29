import { Postman, item } from "@0x1eef/postman";

(function () {
  const { rev, progressBar, progressFile } = getPageState();
  const postman = Postman(
    item.font("Noto Sans", "/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
    item.font("Noto Sans Arabic", "/fonts/NotoSansArabic-VariableFont_wdth,wght.ttf"),
    item.script(`/js/main/vendor.js?v=${rev}`),
    item.script(`/js/main/surah-index.js?v=${rev}`),
  );

  postman.addEventListener("error", (e) => {
    const { controller } = e.detail;
    controller.abort();
  });

  postman.addEventListener("progress", (e) => {
    const {
      parcel,
      item: { href },
      controller,
      progress,
    } = e.detail;
    if (controller.signal.aborted) {
      return;
    } else {
      progressBar.value = progress;
      progressFile.innerText = href.split("/").pop().replace(/\?.*/, "");
      if (progress === 100) setTimeout(() => append(parcel), 250);
    }
  });

  postman.deliver();
})();

function getPageState() {
  return {
    rev: document.querySelector("meta[name='revision']").getAttribute("content"),
    progressBar: document.querySelector(".postman.main progress"),
    progressFile: document.querySelector(".postman.main .percentage"),
  };
}

function append(parcel) {
  document.querySelectorAll(".postman").forEach((el) => el.remove());
  parcel.fonts.forEach((font) => document.fonts.add(font));
  parcel.scripts.forEach((script) => document.body.appendChild(script));
}
