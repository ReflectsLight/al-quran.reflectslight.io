import { Locale } from "lib/Locale";

(function (window, location) {
  const locale = Locale(window).fromBrowser();
  location.replace(`/${locale}/`);
})(window, location);
