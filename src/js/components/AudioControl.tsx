import url from "url";
import * as Quran from "lib/Quran";
import React, { useEffect, useMemo, useState } from "react";
import { SoundOnShape, SoundOffShape } from "components/Shape";

type Props = {
  recitation: Quran.Recitation;
  surah: Quran.Surah;
  ayah: Quran.Ayah;
  onStall?: (e?: Event) => void;
  onPlay?: (e?: Event) => void;
  onPlaying?: (e?: Event) => void;
  onPause?: (e?: Event) => void;
  onEnd?: (turnOffSound: () => void) => void;
};

export function AudioControl({
  recitation,
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

  useEffect(() => {
    audio.addEventListener("ended", () => onEnd(turnOffSound));
    audio.addEventListener("stalled", onStall);
    audio.addEventListener("waiting", onStall);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("playing", onPlaying);
  }, []);

  useEffect(() => {
    if (soundOn) {
      audio.src = [url.format(recitation.url), surah.id, `${ayah.id}.mp3`].join("/");
      audio.play();
    } else {
      audio.pause();
      onPause();
    }
  }, [soundOn, ayah.id]);

  return (
    <>
      {soundOn && <SoundOnShape onClick={turnOffSound} />}
      {!soundOn && <SoundOffShape onClick={turnOnSound} />}
    </>
  );
}