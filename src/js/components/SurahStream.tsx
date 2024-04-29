import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import * as Quran from "~/lib/Quran";
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
import { TFunction } from "~/lib/i18n";

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

export function SurahStream({ node, recitations, locale, paused, t }: Props) {
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
        <Head locale={locale} theme={theme} setTheme={setTheme}>
          {t(locale, "TheNobleQuran")}
        </Head>
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