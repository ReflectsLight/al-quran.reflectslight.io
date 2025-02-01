import type { Surah, Ayah, TLocale } from "Quran";
import type { TAudio } from "~/hooks/useAudio";
import { formatNumber } from "~/lib/t";

type Maybe<T> = T | null | undefined;

type Props = {
  hidden: boolean;
  locale: TLocale;
  surah: Surah;
  ayah: Maybe<Ayah>;
  isPaused: boolean;
  audio: TAudio;
  onComplete: (surah: Surah, ayah: Ayah) => void;
};

export function Timer({ hidden, locale, surah, ayah, isPaused, audio, onComplete }: Props) {
  const [ms, setMs] = useState<number | null>(null);
  const isRTL = locale.direction === "rtl";
  const isLTR = locale.direction === "ltr";

  if (hidden) {
    return null;
  }

  function getMs() {
    if (audio.isEnabled) {
      if (audio.isPlaying) {
        return ms || audio.el.duration * 1000;
      } else if (audio.isPaused) {
        return ms;
      } else {
        return null;
      }
    } else {
      return ayah?.ms || null;
    }
  }

  useEffect(() => {
    if (ayah) {
      setMs(getMs());
    }
  }, [ayah?.id, audio.isPlaying, audio.isPaused, audio.isEnabled]);

  useEffect(() => {
    if (audio.isEnabled) {
      if (isPaused) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [isPaused]);

  useEffect(() => {
    const noop =
      isPaused ||
      (audio.isEnabled &&
        (audio.showStalledIcon || audio.isPaused || isNaN(audio.el.duration)));
    if (noop) {
      return;
    } else {
      const tid = setTimeout(() => {
        const nms = Number(ms);
        if (nms > 0) {
          setMs(nms - 250);
        } else if (ayah) {
          onComplete(surah, ayah);
        }
      }, 250);
      return () => clearTimeout(tid);
    }
  }, [isPaused, ms, audio.isEnabled, audio.showStalledIcon, audio.isPaused]);

  return (
    <div
      className={classNames("timer font-extrabold text-base w-10 flex color-primary", {
        "justify-start": isLTR,
        "justify-end": isRTL,
      })}
    >
      {!ms || ms / 1000 <= 0
        ? formatNumber(locale, 0)
        : formatNumber(locale, ms / 1000, { maximumFractionDigits: 0 })}
    </div>
  );
}
