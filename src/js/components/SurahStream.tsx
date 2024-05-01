import React, { useState, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { Surah, TSurah, TAyat, TLocale } from "Quran";
import { useTheme } from "~/hooks/useTheme";
import { Timer } from "~/components/Timer";
import { Stream } from "~/components/Stream";
import { AudioControl } from "~/components/AudioControl";
import { Head } from "~/components/Head";
import {
  PlayIcon,
  PauseIcon,
  RefreshIcon,
  StalledIcon,
} from "~/components/Icon";
import { TFunction } from "~/lib/t";

type Props = {
  surah: Surah<TSurah>;
  locale: TLocale;
  t: TFunction;
};

export function SurahStream({ surah, locale, t }: Props) {
  const [stream, setStream] = useState<TAyat>([]);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audioStatus, setAudioStatus] = useState<TAudioStatus>(null);
  const [endOfStream, setEndOfStream] = useState<boolean>(false);
  const [theme, setTheme] = useTheme();
  const readyToRender = stream.length > 0;
  const ayah = stream[stream.length - 1];
  const [ms, setMs] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>();
  const audio = useMemo(() => new Audio(), []);

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
      setMs(ayah.ms);
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
        <Head locale={locale} theme={theme} setTheme={setTheme}>
          {t(locale, "TheNobleQuran")}
        </Head>
      )}
      {readyToRender && (
        <Stream
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
              autoPlay={true}
              audio={audio}
              surah={surah}
              ayah={ayah}
              onStatusChange={s => setAudioStatus(s)}
            />
          </div>
        )}
        {readyToRender && !endOfStream && audioStatus !== "wait" && (
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
        )}
        {readyToRender && audioStatus === "wait" && <StalledIcon />}
        {readyToRender && endOfStream && (
          <RefreshIcon onClick={() => setStream([])} />
        )}
      </footer>
    </article>
  );
}
