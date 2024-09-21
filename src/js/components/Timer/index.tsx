import type { Surah, Ayah, TLocale } from "Quran";
import { formatNumber } from "~/lib/t";

type Maybe<T> = T | null | undefined;

type Props = {
  locale: TLocale;
  surah: Surah;
  ayah: Maybe<Ayah>;
  isPaused: boolean;
  audio: HTMLAudioElement;
  audioStatus: Maybe<string>;
  onComplete: (surah: Surah, ayah: Ayah) => void;
};

export function Timer({
  locale,
  surah,
  ayah,
  isPaused,
  audio,
  audioStatus,
  onComplete,
}: Props) {
  const [ms, setMs] = useState<number | null>(null);
  const isStalled = audioStatus === "wait";

  function getMs() {
    const fallback =
      audioStatus === null || audioStatus === "pause" || isNaN(audio.duration);
    if (fallback) {
      console.info("timer: length determined by ayah.ms");
      return ayah?.ms || 0;
    } else {
      console.info("timer: length determined by HTMLAudioElement");
      return audio.duration * 1000;
    }
  }

  useEffect(() => {
    if (ayah) {
      setMs(getMs());
    }
  }, [ayah?.id]);

  useEffect(() => {
    if (audioStatus === "play") {
      setMs(getMs());
    }
  }, [audioStatus]);

  useEffect(() => {
    const noop = !ayah || typeof ms !== "number" || isStalled || isPaused;
    if (noop) {
      return;
    } else if (ms <= 0) {
      onComplete(surah, ayah);
    } else {
      const tid = setTimeout(() => setMs(ms - 100), 100);
      return () => clearTimeout(tid);
    }
  }, [isStalled, isPaused, ms]);

  if (isStalled) {
    return null;
  }

  return (
    <div className="timer font-extrabold text-base w-10 flex justify-end color-primary">
      {!ms || ms / 1000 <= 0
        ? formatNumber(locale, 0)
        : formatNumber(locale, ms / 1000, { maximumFractionDigits: 0 })}
    </div>
  );
}
