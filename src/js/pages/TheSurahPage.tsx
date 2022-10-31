import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import useSurah from "hooks/useSurah";
import { Timer } from "components/TheQuran/Timer";
import { Stream } from "components/TheQuran/Stream";
import classNames from "classnames";

function TheSurahPage() {
  const [loading, surah] = useSurah("en", 1);
  const [stream, setStream] = useState([]);
  const [theme , setTheme] = useState("moon");

  useEffect(() => {
    if (surah) {
      setStream([surah.ayat[stream.length]])
    }
  }, [surah]);

  return (
    <div className={classNames(theme, "theme")}>
      <div className="flex-image">
        <div className="image"></div>
      </div>
      {stream.length &&
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
      {stream.length && <Stream surah={surah} stream={stream}/>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.querySelector(".surah"));
root.render(<TheSurahPage/>);
