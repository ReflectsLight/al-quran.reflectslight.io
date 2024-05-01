import url from "url";
import type { Surah, TSurah, Ayah, TAyah } from "Quran";
import React, { useEffect, useMemo, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "~/components/Icon";

export type TAudioStatus = "play" | "pause" | "wait" | "end";

type Props = {
  autoPlay?: boolean;
  onStatusChange?: (s: TAudioStatus) => void;
  audio: HTMLAudioElement;
  surah: Surah<TSurah>;
  ayah: Ayah<TAyah>;
};

export function AudioControl({
  autoPlay = false,
  onStatusChange = () => null,
  audio,
  surah,
  ayah,
}: Props) {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [audioStatus, setAudioStatus] = useState<TAudioStatus>(null);
  const play = (audio: HTMLAudioElement) => audio.play().catch(() => null);
  const pause = (audio: HTMLAudioElement) => audio.pause();

  useEffect(() => {
    if (audio) {
      audio.src = [
        "https://al-quran.reflectslight.io",
        "audio",
        "alafasy",
        surah.id,
        `${ayah.id}.mp3`,
      ].join("/");
      if (autoPlay) {
        play(audio);
      }
    }
  }, [ayah.id]);

  useEffect(() => {
    if (!autoPlay && audioStatus === "end") {
      setEnabled(false);
    }
    onStatusChange(audioStatus);
  }, [audioStatus]);

  useEffect(() => {
    if (!audio) return;
    const onPlay = () => setAudioStatus("play");
    const onPause = () => setAudioStatus("pause");
    const onEnd = () => setAudioStatus("end");
    const onWait = () => [setAudioStatus("wait"), play(audio)];
    audio.addEventListener("play", onPlay);
    audio.addEventListener("playing", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("stalled", onWait);
    audio.addEventListener("waiting", onWait);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("playing", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("stalled", onWait);
      audio.removeEventListener("waiting", onWait);
    };
  }, [ayah.id]);

  return (
    <>
      {enabled && (
        <SoundOnIcon onClick={() => [setEnabled(false), pause(audio)]} />
      )}
      {!enabled && (
        <SoundOffIcon onClick={() => [setEnabled(true), play(audio)]} />
      )}
    </>
  );
}
