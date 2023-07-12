import * as Quran from 'lib/Quran';
import React, { useEffect, useRef } from 'react';
import { formatNumber, TFunction } from 'lib/i18n';
import { Slice } from 'lib/Quran/Slice';
import classNames from 'classnames';

interface Props {
  reciter: Quran.Reciter
  surah: Quran.Surah
  stream: Quran.Ayat
  locale: Quran.Locale
  slice: Slice
  endOfStream: boolean
  isPaused: boolean
  soundOn: boolean
  setSoundOn: (v: boolean) => void
  t: TFunction
}

export function Stream({ reciter, surah, stream, locale, slice, endOfStream, isPaused, setSoundOn, soundOn, t }: Props) {
  const className = classNames('body', 'stream');
  const style: React.CSSProperties = endOfStream || isPaused ?
                                     { 'overflowY': 'auto' } :
                                     { 'overflowY': 'hidden' };
  const audioRef = useRef<HTMLAudioElement>(null);
  const ayat = stream.map((ayah: Quran.Ayah) => {
    const { url: baseUrl } = reciter;
    return (
      <li key={ayah.id} className="ayah fade">
        <span className="surah-id ayah-id">
          {t(locale, 'surah')}{' '}
          {formatNumber(surah.id, locale)}
          {t(locale, 'comma')}{' '}
          {t(locale, 'ayah')}{' '}
          {formatNumber(ayah.id, locale)}
        </span>
        <p>{ayah.text}</p>
        <audio ref={audioRef} src={`${baseUrl}/${surah.id}/${ayah.id}.mp3`} />
      </li>
    );
  });


  useEffect(() => {
    const ul: HTMLElement = document.querySelector('ul.stream')!;
    if (slice.coversOneAyah) {
      const li: HTMLLIElement = ul.querySelector('li:last-child')!;
      li.scrollIntoView();
    } else {
      ul.scroll({ top: ul.scrollHeight, behavior: 'smooth' });
    }
  }, [stream]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    } else if (isPaused || !soundOn) {
      audio.pause();
    } else if (soundOn) {
      audio.play()
           .catch(() => setSoundOn(false));
    }
  }, [stream, isPaused, soundOn]);

  return (
    <ul lang={locale} className={className} style={style}>
      {ayat}
    </ul>
  );
}
