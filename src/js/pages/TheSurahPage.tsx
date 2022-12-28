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
  ayahId: number
}

function TheSurahPage({ locale, surahId, ayahId }: PageProps) {
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
    if (ayahId === 1) {
      setStream([surah.ayat[stream.length]]);
    } else {
      setStream(surah.ayat.slice(0, ayahId));
    }
  }, []);

  return (
    <div className={classNames(theme, "theme", locale)}>
      <a href="/" className="flex-image">
        <div className="image" />
      </a>
      {readyToRender && (
        <div className="flex-row">
          <ThemeSelect theme={theme} setTheme={setTheme} />
          <LanguageSelect locale={locale} surah={surah} stream={stream} />
        </div>
      )}
      {readyToRender && <AboutSurah locale={locale} surah={surah}/>}
      {readyToRender &&
        <Stream
          ayahId={ayahId}
          surah={surah}
          stream={stream}
          locale={locale}/>
      }
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
const params = new URLSearchParams(location.search);
const ayahId = parseInt(params.get('ayah') || '1');
const root = ReactDOM.createRoot(el);
root.render(<TheSurahPage locale={locale} surahId={surahId} ayahId={ayahId}/>);
