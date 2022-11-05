import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import useSurah from 'hooks/useSurah';
import { Timer } from 'components/TheQuran/Timer';
import { Stream } from 'components/TheQuran/Stream';
import { AboutSurah } from 'components/TheQuran/AboutSurah';
import { ThemeSelect } from 'components/TheQuran/ThemeSelect';
import classNames from 'classnames';
import { get as getCookie } from 'es-cookie';

interface PageProps {
  locale: string
  surahId: number
}

function TheSurahPage ({ locale, surahId }: PageProps) {
  const { surahIsLoaded, surah } = useSurah(locale, surahId);
  const [stream, setStream] = useState([]);
  const [theme, setTheme] = useState(getCookie('theme') || 'moon');
  const streamIsLoaded = !(stream.length === 0);

  useEffect(() => {
    if (surahIsLoaded) {
      document.title = [
        'Al-Quran:',
        surah.transliteratedName,
        `(${surah.translatedName})`
      ].join(' ');
      setStream([surah.ayat[stream.length]]);
    }
  }, [surahIsLoaded]);

  return (
    <div className={classNames(theme, 'theme')}>
      <div className='flex-image'>
        <div className='image' />
      </div>
      {streamIsLoaded &&
        <div className='flex-row'>
          <span />
          <ThemeSelect theme={theme} setTheme={setTheme} />
          <span />
        </div>}
      {streamIsLoaded && <AboutSurah surah={surah} />}
      {streamIsLoaded && <Stream surah={surah} stream={stream} />}
      {streamIsLoaded && stream.length < surah.numberOfAyah &&
        <Timer
          surah={surah}
          ayah={surah.ayat[stream.length - 1]}
          setStream={setStream}
          stream={stream}
        />}
    </div>
  );
}

const el = document.querySelector('.surah');
const locale = el.getAttribute('data-locale');
const surahId = parseInt(el.getAttribute('data-surah-id'));
const root = ReactDOM.createRoot(el);
root.render(<TheSurahPage locale={locale} surahId={surahId} />);
