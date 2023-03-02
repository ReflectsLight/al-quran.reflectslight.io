import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import classNames from 'classnames';
import { get as getCookie } from 'es-cookie';
import * as Quran from 'lib/Quran';
import { SelectOption } from 'components/Select';
import { ThemeSelect } from 'components/ThemeSelect';
import { LanguageSelect } from 'components/LanguageSelect';
import { strings } from 'lib/i18n';

interface Props {
  locale: Quran.Locale
  surahs: Quran.Surah[]
}

function TheSurahIndex({ locale, surahs }: Props) {
  const [theme, setTheme] = useState(getCookie('theme') || 'moon');
  const s = strings(locale);
  const onLanguageChange = (o: SelectOption) => {
    document.location.replace(`/${o.value}/`);
  };

  useEffect(() => {
    document.title = 'Al-Quran: index';
  }, []);

  return (
    <div className={classNames('content', 'theme', theme, locale)}>
      <div className="header">
        <a href={'/' + locale} className="image" />
      </div>
      <div className="row title">{s('TheNobleQuran')}</div>
      <div className="row dropdown-row">
        <ThemeSelect theme={theme} setTheme={setTheme} />
        <LanguageSelect locale={locale} onChange={onLanguageChange} />
      </div>
      <ul className="body index scroll-y">
        {surahs.map((surah, key) => (
          <li className="surah" key={key}>
            <a href={`/${locale}/${surah.slug}`} target="_blank" rel="noreferrer">
              <div className="surah id">{surah.id.toLocaleString(locale)}</div>
              <div className="surah name">{surah.translatedName}</div>
              <div className="surah name transliterated" lang="en">{surah.transliteratedName}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


(function() {
  const root: HTMLElement = document.querySelector('.root');
  const locale = root.getAttribute('data-locale') as Quran.Locale;
  const script: HTMLScriptElement = document.querySelector('script[src="/surahs.json"]');
  const surahs: Quran.Surah[] = JSON.parse(script.innerText)
                                    .map((el: Quran.JSON.Surah) => {
                                      return Quran.Surah.fromJSON(locale, el);
                                    });

  ReactDOM
    .createRoot(root)
    .render(
      <TheSurahIndex locale={locale} surahs={surahs} />
    );
})();
