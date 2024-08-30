import type { Surah, Ayah } from "Quran";
import { SoundOnIcon, SoundOffIcon } from "~/components/Icon";

export type TAudioStatus = "play" | "pause" | "wait" | "end";

type Maybe<T> = T | null | undefined;
type TChangeFuncs = [() => void, () => void];
type Props = {
  audio: HTMLAudioElement;
  surah: Surah;
  ayah: Maybe<Ayah>;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  hidden?: boolean;
  onStatusChange?: (s: TAudioStatus, fns: TChangeFuncs) => void;
};

export function AudioControl({
  audio,
  surah,
  ayah,
  enabled,
  setEnabled,
  hidden = false,
  onStatusChange = () => null,
}: Props) {
  const [audioStatus, setAudioStatus] = useState<Maybe<TAudioStatus>>(null);
  const [audioBaseUrl, setAudioBaseUrl] = useState<Maybe<string>>(null);
  const play = (audio: HTMLAudioElement) => audio.play().catch(() => null);
  const pause = (audio: HTMLAudioElement) => audio.pause();

  useEffect(() => {
    if (hidden || !ayah || !audio || !audioBaseUrl) {
      return;
    }
    if (enabled) {
      audio.src = [audioBaseUrl, surah.id, `${ayah.id}.mp3`].join("/");
      play(audio);
    }
  }, [hidden, enabled, ayah?.id, audioBaseUrl]);

  useEffect(() => {
    const el: HTMLDivElement | null = document.querySelector(
      "[data-audio-base-url]",
    );
    const url = el?.dataset?.audioBaseUrl;
    if (url?.length) {
      setAudioBaseUrl(url);
    } else {
      console.warn("audio.base_url is not set");
    }
  }, []);

  useEffect(() => {
    if (!audio || !ayah) {
      return;
    }
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
  }, [enabled, ayah?.id]);

  useEffect(() => {
    if (audioStatus) {
      onStatusChange(audioStatus, [
        () => setEnabled(true),
        () => setEnabled(false),
      ]);
    }
  }, [audioStatus]);

  if (hidden) {
    return null;
  }

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
