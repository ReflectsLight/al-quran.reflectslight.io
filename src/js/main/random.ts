(function () {
  const el: HTMLElement = document.querySelector(".json.slugs")!;
  const surahId: number = Math.ceil(Math.random() * 114);
  const titles = JSON.parse(el.innerText);
  const title = titles[surahId];
  const locale = location.pathname.slice(1, 3);
  location.replace(["", locale, title, ""].join("/"));
})();
