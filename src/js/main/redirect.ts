(function () {
  const LOCALES = ["ar", "en"];
  const DEFAULT_LOCALE = "en";
  function getUserLocale() {
    return (
      navigator.languages
        .map(s => s.slice(0, 2))
        .find(s => LOCALES.includes(s)) || DEFAULT_LOCALE
    );
  }
  location.replace(["", getUserLocale(), ""].join("/"));
})();
