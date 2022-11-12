import { ReporterFunction } from "./types";

export default function(
  others: string[] | undefined,
  reporter: ReporterFunction
) {
  return Promise.all(
    (others || []).map((src) => {
      return fetch(src)
            .then((res) => res.text())
            .then((text) => Object.assign(document.createElement("script"), {type: "text/plain", src, text}))
            .then((el) => reporter(el));
    })
  );
}
