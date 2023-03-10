import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import classNames from 'classnames';
import { get as getCookie } from 'es-cookie';
import { Timer } from 'components/Timer';
import { Stream } from 'components/Stream';
import { SelectOption } from 'components/Select';
import { ThemeSelect } from 'components/ThemeSelect';
import { LanguageSelect } from 'components/LanguageSelect';
import { PlayShape, PauseShape } from 'components/Shape';
import * as Quran from 'lib/Quran';
import { Slice } from 'lib/Quran/Slice';
import { strings } from 'lib/i18n';

interface Props {
  locale: Quran.Locale
  surahId: number
  slice: Slice
  paused: boolean
}

function SurahStream({ locale, surahId, slice, paused }: Props) {
  const path = `/${locale}/${surahId}/surah.json`;
  const node: HTMLScriptElement = document.querySelector(`script[src="${path}"]`);
  const [stream, setStream] = useState([]);
  const [isPaused, setIsPaused] = useState<boolean>(paused);
  const [theme, setTheme] = useState(getCookie('theme') || 'moon');
  const [surah] = useState<Quran.Surah>(Quran.Surah.fromDOMNode(locale, node));
  const readyToRender = stream.length > 0;
  const s = strings(locale);
  const onLanguageChange = (o: SelectOption) => {
    const locale = o.value;
    const params = [
      ['ayah', slice.toParam() || stream.length],
      ['paused', isPaused ? 't' : null]
    ];
    const query = params.filter(([, v]) => v).flatMap(([k,v]) => `${k}=${v}`).join('&');
    location.replace(`/${locale}/${surah.slug}/?${query}`);
  };
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
      `(${surah.localizedName})`
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
        <>
          <div className="row title">{s('TheNobleQuran')}</div>
          <div className="row dropdown-row">
            <ThemeSelect theme={theme} setTheme={setTheme} />
            <LanguageSelect locale={locale} onChange={onLanguageChange} />
          </div>
        </>
      )}
      {readyToRender && (
        <div className="row details">
          <span lang={locale}>{surah.localizedName}</span>
          <span lang="en">{surah.transliteratedName}</span>
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
      <SurahStream
        locale={locale}
        surahId={surahId}
        slice={slice}
        paused={paused}
      />
    );
})();
