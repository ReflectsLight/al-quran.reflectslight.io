import { ReporterFunction } from "./types";

export default function(
  stylesheets: string[] | undefined,
  reporter: ReporterFunction
) {
  return Promise.all(
    (stylesheets || []).map((href) => {
      return fetch(href)
            .then((res) => res.text())
            .then((innerText) => Object.assign(document.createElement("style"), {innerText}))
            .then((el) => reporter(el));
    })
  );
}
