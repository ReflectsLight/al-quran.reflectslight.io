import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import classNames from "classnames";
import { get as getCookie } from "es-cookie";
import { Timer } from "components/TheQuran/Timer";
import { Stream } from "components/TheQuran/Stream";
import { AboutSurah } from "components/TheQuran/AboutSurah";
import { ThemeSelect } from "components/TheQuran/ThemeSelect";
import { LanguageSelect } from "components/TheQuran/LanguageSelect";
import { Locale, Surah } from "lib/Quran";

interface PageProps {
  locale: Locale;
  surahId: number;
}

function TheSurahPage({ locale, surahId }: PageProps) {
  const path = `/${locale}/${surahId}/surah.json`;
  const node: HTMLScriptElement = document.querySelector(`script[src="${path}"]`);
  const surah = Surah.fromDOMNode(locale, node);
  const [stream, setStream] = useState([]);
  const [theme, setTheme] = useState(getCookie("theme") || "moon");
  const readyToRender = stream.length > 0;

  useEffect(() => {
    document.title = [
      "Al-Quran:",
      surah.transliteratedName,
      `(${surah.translatedName})`,
    ].join(" ");
    setStream([surah.ayat[stream.length]]);
  }, []);

  return (
    <div className={classNames(theme, "theme", locale)}>
      <a href="/" className="flex-image">
        <div className="image" />
      </a>
      {readyToRender && (
        <div className="flex-row">
          <ThemeSelect theme={theme} setTheme={setTheme} />
          <LanguageSelect locale={locale} surah={surah} />
        </div>
      )}
      {readyToRender && <AboutSurah locale={locale} surah={surah}/>}
      {readyToRender && <Stream surah={surah} stream={stream} locale={locale}/>}
      {readyToRender && stream.length < surah.numberOfAyah && (
        <Timer
          surah={surah}
          ayah={surah.ayat[stream.length - 1]}
          setStream={setStream}
          stream={stream}
          locale={locale}
        />
      )}
    </div>
  );
}

const el = document.querySelector(".surah");
const locale = el.getAttribute("data-locale") as Locale;
const surahId = parseInt(el.getAttribute("data-surah-id"));
const root = ReactDOM.createRoot(el);
root.render(<TheSurahPage locale={locale} surahId={surahId} />);
