(function () {
  const nameById = require("@json/nameById.json");
  const surahId = parseInt(Math.ceil(Math.random() * 114));
  const name = nameById[surahId];
  const locale = location.pathname.slice(1, 3);
  location.replace(["", locale, name, ""].join("/"));
})();
