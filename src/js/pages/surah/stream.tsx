import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import classNames from "classnames";
import { get as getCookie } from "es-cookie";
import { Timer } from "components/Timer";
import { Stream } from "components/Stream";
import { SelectOption } from "components/Select";
import { ThemeSelect } from "components/ThemeSelect";
import { LanguageSelect } from "components/LanguageSelect";
import {
  PlayShape,
  PauseShape,
  SoundOnShape,
  SoundOffShape,
  RefreshShape,
} from "components/Shape";
import * as Quran from "lib/Quran";
import { Slice } from "lib/Quran/Slice";
import { i18n, TFunction } from "lib/i18n";

interface Props {
  node: HTMLScriptElement;
  reciters: Quran.Reciter[];
  locale: Quran.Locale;
  slice: Slice;
  paused: boolean;
  t: TFunction;
}

const getTimeSlots = (reciter: Quran.Reciter) => {
  const selector = `script.reciter.time-slots.${reciter.id}`;
  const timeSlots: HTMLScriptElement = document.querySelector(selector)!;
  return timeSlots;
};

function SurahStream({ node, reciters, locale, slice, paused, t }: Props) {
  const [stream, setStream] = useState<Quran.Ayat>([]);
  const [isPaused, setIsPaused] = useState<boolean>(paused);
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [isStalled, setIsStalled] = useState<boolean>(false);
  const [theme, setTheme] = useState(getCookie("theme") || "moon");
  const [reciter] = useState<Quran.Reciter>(reciters[0]);
  const [surah] = useState<Quran.Surah>(
    Quran.Surah.fromDOMNode(locale, node, getTimeSlots(reciter)),
  );
  const readyToRender = stream.length > 0;
  const audioRef = useRef<HTMLAudioElement>(null);
  const { url: baseUrl } = reciter;
  const ayah = stream[stream.length - 1];
  const src = `${baseUrl}/${surah.id}/${ayah?.id}.mp3`;
  const getAyahParam = (slice: Slice, stream: Quran.Ayat) => {
    if (slice.coversSubsetOfSurah) {
      return `${slice.begin}..${slice.end}`;
    } else {
      return stream.length;
    }
  };
  const onLanguageChange = (o: SelectOption) => {
    const locale = o.value;
    const params = [
      ["ayah", getAyahParam(slice, stream)],
      ["paused", isPaused ? "t" : null],
    ];
    const query = params
      .filter(([, v]) => v)
      .flatMap(([k, v]) => `${k}=${v}`)
      .join("&");
    location.replace(`/${locale}/${surah.slug}/?${query}`);
  };
  const endOfStream = (function () {
    if (slice.coversOneAyah || slice.coversOneSurah) {
      return stream.length === surah.ayat.length;
    } else if (slice.coversSubsetOfSurah) {
      return stream.length === slice.subsetLength;
    } else {
      return false;
    }
  })();

  useEffect(() => {
    if (slice.coversOneAyah) {
      setStream([...surah.ayat.slice(0, slice.begin)]);
    } else {
      setStream([surah.ayat[slice.begin - 1]]);
    }
  }, [stream.length === 0]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    } else if (isPaused || !soundOn) {
      audio.pause();
    } else if (soundOn) {
      audio.play().catch(() => setSoundOn(false));
    }
  }, [stream, isPaused, soundOn]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("ended", () => audio.setAttribute("src", src));
    audio.addEventListener("stalled", () => setIsStalled(true));
    audio.addEventListener("waiting", () => setIsStalled(true));
    audio.addEventListener("playing", () => setIsStalled(false));
    audio.addEventListener("play", () => setIsStalled(false));
  }, []);

  return (
    <div className={classNames("content", "theme", theme, locale)}>
      <div className="header">
        <a href={"/" + locale} className="image" />
      </div>
      {readyToRender && (
        <>
          <div className="row title">{t(locale, "TheNobleQuran")}</div>
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
      {readyToRender && (
        <Stream
          slice={slice}
          surah={surah}
          stream={stream}
          locale={locale}
          endOfStream={endOfStream}
          isPaused={isPaused}
          t={t}
        />
      )}
      <div
        className={classNames(
          { "justify-end": readyToRender && endOfStream },
          "row",
        )}
      >
        {readyToRender && isPaused && !endOfStream && (
          <PlayShape onClick={() => setIsPaused(false)} />
        )}
        {readyToRender && !isPaused && !endOfStream && (
          <PauseShape onClick={() => setIsPaused(true)} />
        )}
        {readyToRender && !endOfStream && soundOn && (
          <SoundOnShape onClick={() => setSoundOn(false)} />
        )}
        {readyToRender && !endOfStream && !soundOn && (
          <SoundOffShape onClick={() => setSoundOn(true)} />
        )}
        {readyToRender && !endOfStream && (
          <Timer
            surah={surah}
            setStream={setStream}
            stream={stream}
            locale={locale}
            isPaused={isPaused}
            soundOn={soundOn}
            isStalled={isStalled}
          />
        )}
        {readyToRender && endOfStream && (
          <RefreshShape onClick={() => setStream([])} />
        )}
      </div>
      <audio src={src} ref={audioRef} />
    </div>
  );
}

(function () {
  const root: HTMLElement = document.querySelector(".root")!;
  const locale = root.getAttribute("data-locale") as Quran.Locale;
  const node: HTMLScriptElement = document.querySelector("script.surah")!;
  const toBoolean = (str: string | null): boolean =>
    str !== null && ["1", "t", "true", "yes"].includes(str);
  const params = new URLSearchParams(location.search);
  const slice = Slice.fromParam(params.get("ayah"));
  const paused = toBoolean(params.get("paused"));
  const reciters = JSON.parse(
    document.querySelector<HTMLElement>(".json.reciters")!.innerText,
  );
  const t = i18n(document.querySelector<HTMLElement>(".json.i18n")!.innerText);

  ReactDOM.createRoot(root).render(
    <SurahStream
      reciters={reciters}
      node={node}
      locale={locale}
      slice={slice}
      paused={paused}
      t={t}
    />,
  );
})();
