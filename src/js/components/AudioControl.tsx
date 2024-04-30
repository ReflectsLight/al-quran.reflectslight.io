import url from "url";
import type { Surah, TSurah, Ayah, TAyah } from "Quran";
import React, { useEffect, useMemo, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "~/components/Icon";

type Props = {
  surah: Surah<TSurah>;
  ayah: Ayah<TAyah>;
  onStall?: (e?: Event) => void;
  onPlay?: (e?: Event) => void;
  onPlaying?: (e?: Event) => void;
  onPause?: (e?: Event) => void;
  onEnd?: (turnOffSound: () => void) => void;
};

export function AudioControl({
  surah,
  ayah,
  onPlay = () => null,
  onPlaying = () => null,
  onPause = () => null,
  onStall = () => null,
  onEnd = () => null,
}: Props) {
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const audio = useMemo(() => new Audio(), []);
  const turnOnSound = () => setSoundOn(true);
  const turnOffSound = () => setSoundOn(false);
  const recover = () => {
    if (!soundOn) return;
    onStall();
    audio.play().catch(() => setTimeout(recover, 50));
  };

  useEffect(() => {
    audio.addEventListener("ended", () => onEnd(turnOffSound));
    audio.addEventListener("stalled", recover);
    audio.addEventListener("waiting", onStall);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("playing", onPlaying);
  }, []);

  useEffect(() => {
    const src = [
      "https://al-quran.reflectslight.io",
      "audio",
      "alafasy",
      surah.id,
      `${ayah.id}.mp3`,
    ].join("/");
    if (soundOn) {
      audio.src = src;
      audio.play();
    } else {
      audio.pause();
      onPause();
    }
  }, [soundOn, ayah.id]);

  return (
    <>
      {soundOn && <SoundOnIcon onClick={turnOffSound} />}
      {!soundOn && <SoundOffIcon onClick={turnOnSound} />}
    </>
  );
}
