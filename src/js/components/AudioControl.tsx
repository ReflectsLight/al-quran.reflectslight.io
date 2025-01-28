import type { Surah, Ayah } from "Quran";
import type { TAudio } from "~/hooks/useAudio";
import { SoundOnIcon, SoundOffIcon } from "~/components/Icon";

type Maybe<T> = T | null;

type Props = {
  audio: TAudio;
  surah: Surah;
  ayah: Maybe<Ayah>;
  hidden: boolean;
  className?: string;
};

export function AudioControl({ audio, surah, ayah, hidden, className }: Props) {
  if (!ayah || !audio.el || hidden) {
    return null;
  }

  useEffect(() => {
    if (audio.isEnabled) {
      audio.setSrc({ path: `/${surah.id}/${ayah.id}.mp3` });
      audio.play();
    } else {
      audio.pause();
    }
  }, [ayah.id, audio.isEnabled]);

  return (
    <>
      {audio.isEnabled && (
        <SoundOnIcon className={className} onClick={() => audio.disable()} />
      )}
      {!audio.isEnabled && (
        <SoundOffIcon className={className} onClick={() => audio.enable()} />
      )}
    </>
  );
}
