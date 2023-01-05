import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import classNames from 'classnames';
import { get as getCookie } from 'es-cookie';
import { Timer } from 'components/TheQuran/Timer';
import { Stream } from 'components/TheQuran/Stream';
import { ThemeSelect } from 'components/TheQuran/ThemeSelect';
import { LanguageSelect } from 'components/TheQuran/LanguageSelect';
import { Locale, Surah } from 'lib/Quran';
import { Slice } from 'lib/Quran/slice';

interface Props {
  locale: Locale
  surahId: number
  slice: Slice
}

function TheSurahPage({ locale, surahId, slice }: Props) {
  const path = `/${locale}/${surahId}/surah.json`;
  const node: HTMLScriptElement = document.querySelector(`script[src="${path}"]`);
  const [stream, setStream] = useState([]);
  const [theme, setTheme] = useState(getCookie('theme') || 'moon');
  const [surah] = useState<Surah>(Surah.fromDOMNode(locale, node));
  const readyToRender = stream.length > 0;
  const surahName = locale === 'ar' ? surah.name : surah.translatedName;
  const endOfStream = (function() {
    if (slice.coversOneSurah) {
      return stream.length === surah.ayat.length;
    } else {
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
      setStream([surah.ayat[slice.begin-1]]);
    }
  }, []);

  return (
    <div className={classNames('surah', 'theme', theme, locale)}>
      <div className="image-box">
        <a href="/" className="image"/>
      </div>
      {readyToRender && (
        <div className="surah-row theme-language">
          <ThemeSelect theme={theme} setTheme={setTheme} />
          <LanguageSelect locale={locale} surah={surah} stream={stream} />
        </div>
      )}
      {readyToRender && (
        <div className='surah-row surah-details'>
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
        />
      }
      {readyToRender && !endOfStream && (
        <Timer
          surah={surah}
          setStream={setStream}
          stream={stream}
          locale={locale}
        />
      )}
    </div>
  );
}


(function() {
  const rootBox: HTMLElement = document.querySelector('.root-box');
  const locale = rootBox.getAttribute('data-locale') as Locale;
  const surahId = parseInt(rootBox.getAttribute('data-surah-id'));
  const params = new URLSearchParams(location.search);
  const slice = Slice.fromParam(params.get('ayah'));

  ReactDOM
    .createRoot(rootBox)
    .render(
      <TheSurahPage
        locale={locale}
        surahId={surahId}
        slice={slice}
      />
    );
})();
