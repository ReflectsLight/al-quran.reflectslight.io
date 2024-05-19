import React, { useState, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import type { Surah, Ayah, TAyat, TLocale } from "Quran";
import { useTheme } from "~/hooks/useTheme";
import { AudioControl, TAudioStatus } from "~/components/AudioControl";
import { Head } from "~/components/Head";
import { PlayIcon, PauseIcon, RefreshIcon, StalledIcon } from "~/components/Icon";
import { TFunction } from "~/lib/t";
import { Timer } from "./Timer";
import { Stream } from "./Stream";

type Maybe<T> = T | null | undefined;

type Props = {
  surah: Surah;
  locale: TLocale;
  t: TFunction;
};

export function SurahStream({ surah, locale, t }: Props) {
  const [stream, setStream] = useState<TAyat>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audioStatus, setAudioStatus] = useState<Maybe<TAudioStatus>>(null);
  const [endOfStream, setEndOfStream] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();
  const [ms, setMs] = useState<number | null>(null);
  const articleRef = useRef<HTMLElement>(null);
  const audio = useMemo(() => new Audio(), []);
  const readyToRender = stream.length > 0;
  const ayah: Maybe<Ayah> = stream[stream.length - 1];

  useEffect(() => {
    const el = articleRef.current;
    if (el) {
      el.classList.remove("invisible");
    }
  }, [articleRef.current, theme]);

  useEffect(() => {
    if (ayah) {
      setMs(ayah.ms);
    }
  }, [ayah]);

  useEffect(() => {
    if (!endOfStream) {
      setStream([surah.ayat[0]]);
    }
  }, [endOfStream]);

  return (
    <article
      ref={articleRef}
      className={classNames(
        "flex flex-col invisible h-full content theme",
        locale.name,
        locale.direction,
        theme,
        { hidden: !readyToRender },
      )}
    >
      <Head locale={locale} theme={theme} setTheme={setTheme}>
        {t(locale, "TheNobleQuran")}
      </Head>
      <Stream
        surah={surah}
        stream={stream}
        locale={locale}
        endOfStream={endOfStream}
        isPaused={isPaused}
        t={t}
      />
      <footer className="flex justify-between items-center h-16">
        {!endOfStream && isPaused && <PlayIcon onClick={() => setIsPaused(false)} />}
        {!endOfStream && !isPaused && <PauseIcon onClick={() => setIsPaused(true)} />}
        <span
          className={classNames("sound-box flex w-14 justify-end", {
            hidden: endOfStream,
          })}
        >
          <AudioControl
            audio={audio}
            surah={surah}
            ayah={ayah}
            hidden={endOfStream}
            onStatusChange={status => {
              if (status === "play") {
                setMs(ayah.ms);
              }
              setAudioStatus(status);
            }}
          />
        </span>
        <span
          className={classNames({
            hidden: endOfStream || audioStatus === "wait",
          })}
        >
          <Timer
            locale={locale}
            surah={surah}
            ayah={ayah}
            isPaused={isPaused}
            isStalled={audioStatus === "wait"}
            ms={ms}
            setMs={setMs}
            onComplete={(surah, ayah) => {
              const layah = surah.ayat[surah.ayat.length - 1];
              if (!layah || !ayah) {
                return;
              } else if (layah.id === ayah.id) {
                setEndOfStream(true);
              } else {
                setStream([...stream, surah.ayat[ayah.id]]);
              }
            }}
          />
        </span>
        {audioStatus === "wait" && <StalledIcon />}
        <span className={classNames({ hidden: !endOfStream })}>
          <RefreshIcon onClick={() => [setEndOfStream(false)]} />
        </span>
      </footer>
    </article>
  );
}
