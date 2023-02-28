import * as Quran from 'lib/Quran';
import React, { useEffect } from 'react';
import { numbers, strings } from 'lib/i18n';
import { Slice } from 'lib/Quran/Slice';
import classNames from 'classnames';

interface Props {
  surah: Quran.Surah
  stream: Quran.Ayat
  locale: Quran.Locale
  slice: Slice
  endOfStream: boolean
  isPaused: boolean
}

export function Stream({ surah, stream, locale, slice, endOfStream, isPaused }: Props) {
  const n = numbers(locale);
  const s = strings(locale);
  const className = classNames('stream', { 'scroll-y': endOfStream || isPaused });
  const ayat = stream.map((ayah: Quran.Ayah) => {
    return (
      <li key={ayah.id.number} className="ayah fade">
        <span className="surah-id ayah-id">
          {s('surah')}{' '}
          {n(surah.id.localeKey)}
          {s('comma')}{' '}
          {s('ayah')}{' '}
          {n(ayah.id.localeKey)}
        </span>
        <p>{ayah.text}</p>
      </li>
    );
  });

  useEffect(() => {
    const ul: HTMLElement = document.querySelector('ul.stream');
    if (slice.coversOneAyah) {
      const li: HTMLLIElement = ul.querySelector('li:last-child');
      li.scrollIntoView();
    } else {
      ul.scroll({ top: ul.scrollHeight, behavior: 'smooth' });
    }
  }, [stream]);

  return (
    <ul lang={locale} className={className}>
      {ayat}
    </ul>
  );
}
