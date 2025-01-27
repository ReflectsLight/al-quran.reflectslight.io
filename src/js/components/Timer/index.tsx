import type { Surah, Ayah, TLocale } from "Quran";
import { formatNumber } from "~/lib/t";

type Maybe<T> = T | null | undefined;

type Props = {
  locale: TLocale;
  surah: Surah;
  ayah: Maybe<Ayah>;
  isPaused: boolean;
  audio: HTMLAudioElement;
  onComplete: (surah: Surah, ayah: Ayah) => void;
};

export function Timer({ locale, surah, ayah, isPaused, audio, onComplete }: Props) {
  const [ms, setMs] = useState<number | null>(null);

  if (!ayah) {
    return null;
  }

  function getMs() {
    if (audio.isEnabled) {
      console.info("Timer.tsx", "getMS", "HTMLAudioElement provides duration");
      return audio.el.duration * 1000;
    } else {
      console.info("Timer.tsx", "getMS", "ayah.ms provides duration");
      return ayah.ms;
    }
  }

  useEffect(() => {
    setMs(getMs());
  }, [ayah.id]);

  useEffect(() => {
    if (audio.isEnabled) {
      setMs(getMs());
    }
  }, [audio.isEnabled, audio.el.duration]);

  useEffect(() => {
    if (isPaused || ms === null) {
      return;
    } else {
      const tid = setTimeout(() => {
        if (ms > 0) {
          setMs(ms - 250);
        } else {
          onComplete(surah, ayah);
        }
      }, 250);
      return () => clearTimeout(tid);
    }
  }, [ms, isPaused]);

  return (
    <div className="timer font-extrabold text-base w-10 flex justify-end color-primary">
      {!ms || ms / 1000 <= 0
        ? formatNumber(locale, 0)
        : formatNumber(locale, ms / 1000, { maximumFractionDigits: 0 })}
    </div>
  );
}
