import * as Quran from "lib/Quran";
import React from "react";
import ReactDOM from "react-dom/client";
import { i18n } from "lib/i18n";
import { SurahStream } from "components/SurahStream";

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as Quran.Locale;
  const node: HTMLScriptElement = document.querySelector("script.surah")!;
  const toBoolean = (str: string | null): boolean =>
    str !== null && ["1", "t", "true", "yes"].includes(str);
  const params = new URLSearchParams(location.search);
  const paused = toBoolean(params.get("paused"));
  const recitations = JSON.parse(
    document.querySelector<HTMLElement>(".json.recitations")!.innerText,
  );
  const t = i18n(document.querySelector<HTMLElement>(".json.i18n")!.innerText);

  ReactDOM.createRoot(root).render(
    <SurahStream
      recitations={recitations}
      node={node}
      locale={locale}
      paused={paused}
      t={t}
    />,
  );
})();
