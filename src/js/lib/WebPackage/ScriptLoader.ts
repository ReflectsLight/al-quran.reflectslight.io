import { ReporterFunction } from "./types";
import { fetchOptions } from "./fetchOptions";

export default function(
  scripts: string[] | undefined,
  reporter: ReporterFunction
) {
  return Promise.all(
    (scripts || []).map((src) => {
      return fetch(src, fetchOptions())
            .then((res) => res.text())
            .then((text) => Object.assign(document.createElement("script"), {type: "application/javascript", text}))
            .then((el) => reporter(el));
    })
  );
}
