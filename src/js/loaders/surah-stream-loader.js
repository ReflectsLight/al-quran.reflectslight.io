import { Postman, item } from "@0x1eef/postman";

(function () {
  const { rev, locale, surahId, progressBar, progressFile } = getPageState();
  const postman = Postman(
    ...getFonts(locale),
    item.json(`/json/${locale}/${surahId}/index.json?v=${rev}`, {
      className: "json surah",
    }),
    item.script(`/js/main/vendor.js?v=${rev}`),
    item.script(`/js/main/surah-stream.js?v=${rev}`),
  );

  postman.addEventListener("error", (e) => {
    const {
      controller,
      item: { href },
    } = e.detail;
    console.error("error", href);
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
      if (progress === 100) setTimeout(() => append(parcel), 50);
    }
  });

  postman.deliver();
})();

function getPageState() {
  return {
    locale: document.documentElement.lang,
    rev: document.querySelector("meta[name='revision']").getAttribute("content"),
    surahId: document.querySelector(".app.mount").dataset.surahId,
    progressBar: document.querySelector(".postman.main progress"),
    progressFile: document.querySelector(".postman.main .percentage"),
  };
}

function getFonts(locale) {
  return [
    item.font("Noto Sans", "/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
    item.font("Noto Sans Arabic", "/fonts/NotoSansArabic-VariableFont_wdth,wght.ttf"),
    locale === "ar"
      ? item.font("Noto Naskh Arabic", "/fonts/NotoNaskhArabic-VariableFont_wght.ttf")
      : null,
  ].filter((i) => !!i);
}

function append(parcel) {
  document.querySelectorAll(".postman").forEach((el) => el.remove());
  parcel.json.forEach((json) => document.body.appendChild(json));
  parcel.fonts.forEach((font) => document.fonts.add(font));
  parcel.scripts.forEach((script) => document.body.appendChild(script));
}
