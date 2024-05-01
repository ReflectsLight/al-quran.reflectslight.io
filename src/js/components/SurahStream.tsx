import React, { useState, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import type { Surah, Ayah, TAyat, TLocale } from "Quran";
import { useTheme } from "~/hooks/useTheme";
import { Timer } from "~/components/Timer";
import { Stream } from "~/components/Stream";
import { AudioControl, TAudioStatus } from "~/components/AudioControl";
import { Head } from "~/components/Head";
import {
  PlayIcon,
  PauseIcon,
  RefreshIcon,
  StalledIcon,
} from "~/components/Icon";
import { TFunction } from "~/lib/t";

type Maybe<T> = T | null | undefined;

type Props = {
  surah: Surah;
  locale: TLocale;
  t: TFunction;
};

export function SurahStream({ surah, locale, t }: Props) {
  const [stream, setStream] = useState<TAyat>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audioStatus, setAudioStatus] = useState<TAudioStatus>(null);
  const [endOfStream, setEndOfStream] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();
  const [ms, setMs] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>();
  const audio = useMemo(() => new Audio(), []);
  const readyToRender = stream.length > 0;
  const ayah: Maybe<Ayah> = stream[stream.length - 1];

  useEffect(() => {
    if (ref.current) {
      const div = ref.current;
      div.classList.remove("invisible");
    }
  }, [ref.current, theme]);

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
      ref={ref}
      className={classNames(
        "flex flex-col invisible h-full content theme",
        locale,
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
        {!endOfStream && isPaused && (
          <PlayIcon onClick={() => setIsPaused(false)} />
        )}
        {!endOfStream && !isPaused && (
          <PauseIcon onClick={() => setIsPaused(true)} />
        )}
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
            surah={surah}
            setStream={setStream}
            setEndOfStream={setEndOfStream}
            stream={stream}
            locale={locale}
            isPaused={isPaused}
            isStalled={audioStatus === "wait"}
            ms={ms}
            setMs={setMs}
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
