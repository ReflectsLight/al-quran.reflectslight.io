import { Postman, item } from "@0x1eef/postman"

function getContext() {
  return {
    locale: document.documentElement.lang,
    rev: document.querySelector("meta[name='revision']").getAttribute("content"),
    surahId: document.querySelector(".app.mount").dataset.surahId,
    progressBar: document.querySelector(".postman.main progress"),
    progressFile: document.querySelector(".postman.main .filename"),
  }
}

function getFonts(locale) {
  return [
    item.font("Noto Sans", "/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
    item.font("Noto Sans Arabic", "/fonts/NotoSansArabic-VariableFont_wdth,wght.ttf"),
    locale === "ar" ? item.font("Noto Naskh Arabic", "/fonts/NotoNaskhArabic-VariableFont_wght.ttf") : null,
  ].filter((i) => !!i)
}

function getItems(locale, surahId, rev) {
  return [
    ...getFonts(locale),
    item.json(`/json/${locale}/${surahId}/index.json?v=${rev}`, { className: "json surah" }),
    item.script(`/js/main/vendor.js?v=${rev}`),
    item.script(`/js/main/surah-stream.js?v=${rev}`),
  ]
}

;(function () {
  const { rev, locale, surahId, progressBar, progressFile } = getContext()
  const postman = Postman(...getItems(locale, surahId, rev))

  postman.addEventListener("error", (e) => {
    const {
      controller,
      item: { href },
    } = e.detail
    console.error("error", href)
    controller.abort()
  })

  postman.addEventListener("progress", (e) => {
    const {
      parcel,
      item: { href },
      controller,
      progress,
    } = e.detail
    if (controller.signal.aborted) {
      return
    } else {
      progressBar.value = progress
      progressFile.innerText = href.split("/").pop().replace(/\?.*/, "")
      if (progress === 100)
        setTimeout(() => {
          document.querySelectorAll(".postman").forEach((el) => el.remove())
          parcel.json.forEach((json) => document.body.appendChild(json))
          parcel.fonts.forEach((font) => document.fonts.add(font))
          parcel.scripts.forEach((script) => document.body.appendChild(script))
        }, 50)
    }
  })

  postman.deliver()
})()
