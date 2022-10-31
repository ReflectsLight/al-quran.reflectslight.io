import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import useSurah from "hooks/useSurah";
import { Timer } from "components/TheQuran/Timer";
import { Stream } from "components/TheQuran/Stream";
import classNames from "classnames";

function TheSurahPage() {
  const { surahIsLoaded, surah } = useSurah("en", 1);
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
          <Timer
            surah={surah}
            ayah={surah.ayat[stream.length - 1]}
            setStream={setStream}
            stream={stream}
          />
        </div>
      }
      {streamIsLoaded && <Stream surah={surah} stream={stream}/>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector(".surah"));
root.render(<TheSurahPage/>);
