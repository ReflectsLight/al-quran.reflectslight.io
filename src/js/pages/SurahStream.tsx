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
  const [ms, setMs] = useState<number | null>(null);
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

  useEffect(() => {
    if (ayah) {
      setMs(ayah.readTimeMs);
    }
  }, [ayah]);

  return (
    <article
      ref={ref}
      className={classNames(
        "flex flex-col invisible h-full content theme",
        locale,
        theme,
      )}
    >
      {readyToRender && (
        <header
          className={classNames("flex flex-col", {
            "h-24": locale !== "ar",
            "h-26": locale === "ar",
          })}
        >
          <h1 className="flex justify-center p-0 mt-2">
            <a className="no-underline color-primary" href={`/${locale}/`}>
              {t(locale, "TheNobleQuran")}
            </a>
          </h1>
          <nav className="flex flex-row justify-between">
            <LanguageSelect locale={locale} path={surah.slug} />
            <ThemeSelect theme={theme} setTheme={setTheme} />
          </nav>
          <div className="flex justify-between surah-name">
            <span className="localized-name" lang={locale}>
              {surah.localizedName}
            </span>
            <span className="transliterated-name" lang="en">
              {surah.transliteratedName}
            </span>
          </div>
        </header>
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
      <footer className="flex justify-between items-center h-16">
        {readyToRender && isPaused && !endOfStream && (
          <PlayIcon onClick={() => setIsPaused(false)} />
        )}
        {readyToRender && !isPaused && !endOfStream && (
          <PauseIcon onClick={() => setIsPaused(true)} />
        )}
        {readyToRender && !endOfStream && (
          <div className="sound-box flex w-14 justify-end">
            <AudioControl
              recitation={recitation}
              surah={surah}
              ayah={ayah}
              onPlay={() => setSoundOn(true)}
              onPause={() => setSoundOn(false)}
              onPlaying={() => setIsStalled(false)}
              onStall={() => setIsStalled(true)}
            />
          </div>
        )}
        {readyToRender && !endOfStream && !isStalled && (
          <Timer
            surah={surah}
            setStream={setStream}
            setEndOfStream={setEndOfStream}
            stream={stream}
            locale={locale}
            isPaused={isPaused}
            soundOn={soundOn}
            isStalled={isStalled}
            ms={ms}
            setMs={setMs}
          />
        )}
        {readyToRender && soundOn && isStalled && <StalledIcon />}
        {readyToRender && endOfStream && (
          <RefreshIcon onClick={() => setStream([])} />
        )}
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
