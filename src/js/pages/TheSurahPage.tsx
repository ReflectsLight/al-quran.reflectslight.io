import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import classNames from 'classnames';
import { get as getCookie } from 'es-cookie';
import { Timer } from 'components/TheSurahPage/Timer';
import { Stream } from 'components/TheSurahPage/Stream';
import { ThemeSelect } from 'components/TheSurahPage/ThemeSelect';
import { LanguageSelect } from 'components/TheSurahPage/LanguageSelect';
import { PlayShape, PauseShape } from 'components/TheSurahPage/Shape';
import * as Quran from 'lib/Quran';
import { Slice } from 'lib/Quran/Slice';

interface Props {
  locale: Quran.Locale
  surahId: number
  slice: Slice
  paused: boolean
}

function TheSurahPage({ locale, surahId, slice, paused }: Props) {
  const path = `/${locale}/${surahId}/surah.json`;
  const node: HTMLScriptElement = document.querySelector(`script[src="${path}"]`);
  const [stream, setStream] = useState([]);
  const [isPaused, setIsPaused] = useState<boolean>(paused);
  const [theme, setTheme] = useState(getCookie('theme') || 'moon');
  const [surah] = useState<Quran.Surah>(Quran.Surah.fromDOMNode(locale, node));
  const readyToRender = stream.length > 0;
  const surahName = locale === 'ar' ? surah.name : surah.translatedName;
  const endOfStream = (function() {
    if (slice.coversOneAyah || slice.coversOneSurah) {
      return stream.length === surah.ayat.length;
    } else if (slice.coversSubsetOfSurah) {
      return stream.length === slice.length;
    }
  })();

  useEffect(() => {
    document.title = [
      'Al-Quran:',
      surah.transliteratedName,
      `(${surah.translatedName})`
    ].join(' ');
    if (slice.coversOneAyah) {
      setStream([...surah.ayat.slice(0, slice.end)]);
    } else {
      setStream([surah.ayat[slice.begin - 1]]);
    }
  }, []);

  return (
    <div className={classNames('content', 'theme', theme, locale)}>
      <div className="header">
        <a href={'/' + locale} className="image" />
      </div>
      {readyToRender && (
        <div className="row dropdown-row">
          <ThemeSelect theme={theme} setTheme={setTheme} />
          <LanguageSelect
            locale={locale}
            surah={surah}
            stream={stream}
            isPaused={isPaused}
            slice={slice}
          />
        </div>
      )}
      {readyToRender && (
        <div className="row details">
          <span lang={locale}>{surahName}</span>
          <span>{surah.transliteratedName}</span>
        </div>
      )}
      {readyToRender &&
        <Stream
          slice={slice}
          surah={surah}
          stream={stream}
          locale={locale}
          endOfStream={endOfStream}
          isPaused={isPaused}
        />
      }
      <div className="row">
        {readyToRender && isPaused && !endOfStream &&
          <PlayShape onClick={() => setIsPaused(false)} />}
        {readyToRender && !isPaused && !endOfStream &&
          <PauseShape onClick={() => setIsPaused(true)} />}
        {readyToRender && !endOfStream &&
          <Timer
            surah={surah}
            setStream={setStream}
            stream={stream}
            locale={locale}
            isPaused={isPaused}
          />}
      </div>
    </div>
  );
}


(function() {
  const toBoolean = (str: string | null): boolean => ['1', 't', 'true', 'yes'].includes(str);
  const root: HTMLElement = document.querySelector('.root');
  const locale = root.getAttribute('data-locale') as Quran.Locale;
  const surahId = parseInt(root.getAttribute('data-surah-id'));
  const params = new URLSearchParams(location.search);
  const slice = Slice.fromParam(params.get('ayah'));
  const paused = toBoolean(params.get('paused'));

  ReactDOM
    .createRoot(root)
    .render(
      <TheSurahPage
        locale={locale}
        surahId={surahId}
        slice={slice}
        paused={paused}
      />
    );
})();
