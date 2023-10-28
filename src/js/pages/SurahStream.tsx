import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import classNames from "classnames";

import { useTheme } from "hooks/useTheme";
import { Timer } from "components/Timer";
import { Stream } from "components/Stream";
import { ThemeSelect } from "components/ThemeSelect";
import { LanguageSelect } from "components/LanguageSelect";
import { AudioControl } from "components/AudioControl";
import { PlayIcon, PauseIcon, RefreshIcon, StalledIcon } from "components/Icon";
import * as Quran from "lib/Quran";
import { i18n, TFunction } from "lib/i18n";

interface Props {
  node: HTMLScriptElement;
  recitations: Quran.Recitation[];
  locale: Quran.Locale;
  paused: boolean;
  t: TFunction;
}

const getTimeSlots = (recitation: Quran.Recitation) => {
  const selector = `script.recitation.time-slots.${recitation.id}`;
  const timeSlots: HTMLScriptElement = document.querySelector(selector)!;
  return timeSlots;
};

function SurahStream({ node, recitations, locale, paused, t }: Props) {
  const [stream, setStream] = useState<Quran.Ayat>([]);
  const [isPaused, setIsPaused] = useState<boolean>(paused);
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [isStalled, setIsStalled] = useState<boolean>(false);
  const [endOfStream, setEndOfStream] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();
  const [recitation] = useState<Quran.Recitation>(recitations[0]);
  const [surah] = useState<Quran.Surah>(
    Quran.Surah.fromDOMNode(locale, node, getTimeSlots(recitation)),
  );
  const readyToRender = stream.length > 0;
  const ayah = stream[stream.length - 1];
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (ref.current) {
      const div = ref.current;
      div.classList.remove("invisible");
    }
  }, [ref.current, theme]);

  useEffect(() => {
    setEndOfStream(false);
    setStream([surah.ayat[0]]);
  }, [stream.length === 0]);

  return (
    <article
      ref={ref}
      className={classNames("invisible", "content", "theme", theme, locale)}
    >
      {readyToRender && (
        <>
          <header>
            <h1>
              <a href={`/${locale}/`}>{t(locale, "TheNobleQuran")}</a>
            </h1>
          </header>
          <div className="row dropdown-row">
            <ThemeSelect theme={theme} setTheme={setTheme} />
            <LanguageSelect locale={locale} path={surah.slug} />
          </div>
        </>
      )}
      {readyToRender && (
        <div className="row details">
          <span className="localized-name" lang={locale}>
            {surah.localizedName}
          </span>
          <span className="transliterated-name" lang="en">
            {surah.transliteratedName}
          </span>
        </div>
      )}
      {readyToRender && (
        <Stream
          recitation={recitation}
          surah={surah}
          stream={stream}
          locale={locale}
          endOfStream={endOfStream}
          isPaused={isPaused}
          t={t}
        />
      )}
      <footer>
        {readyToRender && isPaused && !endOfStream && (
          <PlayIcon onClick={() => setIsPaused(false)} />
        )}
        {readyToRender && !isPaused && !endOfStream && (
          <PauseIcon onClick={() => setIsPaused(true)} />
        )}
        {readyToRender && !endOfStream && (
          <AudioControl
            recitation={recitation}
            surah={surah}
            ayah={ayah}
            onPlay={() => setSoundOn(true)}
            onPause={() => setSoundOn(false)}
            onPlaying={() => setIsStalled(false)}
            onStall={() => setIsStalled(true)}
          />
        )}
        {readyToRender && !endOfStream && (
          <Timer
            surah={surah}
            setStream={setStream}
            setEndOfStream={setEndOfStream}
            stream={stream}
            locale={locale}
            isPaused={isPaused}
            soundOn={soundOn}
            isStalled={isStalled}
          />
        )}
        {readyToRender && endOfStream && (
          <RefreshIcon onClick={() => setStream([])} />
        )}
        <div className="br" />
        {readyToRender && soundOn && isStalled && <StalledIcon />}
      </footer>
    </article>
  );
}

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as Quran.Locale;
  const node: HTMLScriptElement = document.querySelector("script.surah")!;
  const toBoolean = (str: string | null): boolean =>
    str !== null && ["1", "t", "true", "yes"].includes(str);
  const params = new URLSearchParams(location.search);
  const paused = toBoolean(params.get("paused"));
  const recitations = JSON.parse(
    document.querySelector<HTMLElement>(".json.recitations")!.innerText,
  );
  const t = i18n(document.querySelector<HTMLElement>(".json.i18n")!.innerText);

  ReactDOM.createRoot(root).render(
    <SurahStream
      recitations={recitations}
      node={node}
      locale={locale}
      paused={paused}
      t={t}
    />,
  );
})();
