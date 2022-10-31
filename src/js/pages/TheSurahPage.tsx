import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import useSurah from "hooks/useSurah";
import { Timer } from "components/TheQuran/Timer";
import { Stream } from "components/TheQuran/Stream";
import { AboutSurah } from "components/TheQuran/AboutSurah";
import classNames from "classnames";

type PageProps = {
  locale: string,
  surahId: number
}

function TheSurahPage({locale, surahId}: PageProps) {
  const { surahIsLoaded, surah } = useSurah(locale, surahId);
  const [stream, setStream] = useState([]);
  const [theme , setTheme] = useState("moon");
  const streamIsLoaded = !!stream.length;

  useEffect(() => {
    if (surahIsLoaded) {
      setStream([surah.ayat[stream.length]]);
    }
  }, [surahIsLoaded]);

  return (
    <div className={classNames(theme, "theme")}>
      <div className="flex-image">
        <div className="image"></div>
      </div>
      {streamIsLoaded &&
        <div className="flex-row">
          <span></span>
          <select name="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="moon">The Moon 🌛</option>
            <option value="leaf">The Leaf 🌿</option>
          </select>
          <span></span>
        </div>
      }
      {streamIsLoaded && <AboutSurah surah={surah}/>}
      {streamIsLoaded && <Stream surah={surah} stream={stream}/>}
      {streamIsLoaded && stream.length < surah.numberOfAyah &&
        <Timer
          surah={surah}
          ayah={surah.ayat[stream.length - 1]}
          setStream={setStream}
          stream={stream}
        />
      }
    </div>
  );
}

const [locale, surahId] = location.pathname.split('/').filter((e) => e);
const root = ReactDOM.createRoot(document.querySelector(".surah"));
root.render(<TheSurahPage locale={locale} surahId={parseInt(surahId)}/>);
