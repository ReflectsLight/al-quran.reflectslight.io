import { item, Postman } from "@0x1eef/postman"

function getContext() {
  return {
    rev: document.querySelector("meta[name='revision']").getAttribute("content"),
    progressBar: document.querySelector(".postman.main progress"),
    progressFile: document.querySelector(".postman.main .filename"),
  }
}

function getItems(rev) {
  return [
    item.font("Noto Sans", "/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
    item.font("Noto Sans Arabic", "/fonts/NotoSansArabic-VariableFont_wdth,wght.ttf"),
    item.script(`/js/main/vendor.js?v=${rev}`, { dataset: { id: "1" } }),
    item.script(`/js/main/surah-index.js?v=${rev}`, { dataset: { id: "2" } }),
  ]
}

function sortById(scripts) {
  return scripts.sort((a, b) => {
    const [x, y] = [parseInt(a.dataset.id), parseInt(b.dataset.id)]
    if (x > y) return 1
    else if (x === y) return 0
    else return -1
  })
}

;(function () {
  const { rev, progressBar, progressFile } = getContext()
  const postman = Postman(...getItems(rev))

  postman.addEventListener("error", (e) => {
    const { controller, error } = e.detail
    controller.abort()
    console.error(error)
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
          parcel.fonts.forEach((font) => document.fonts.add(font))
          sortById(parcel.scripts).forEach((script) => document.body.appendChild(script))
        }, 50)
    }
  })

  postman.deliver()
})()
