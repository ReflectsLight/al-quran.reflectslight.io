import type { Ayah, Surah } from "Quran"

import { SoundOffIcon, SoundOnIcon } from "~/components/Icon"
import { useSettingsContext } from "~/contexts/SettingsContext"
import type { TAudio } from "~/hooks/useAudio"

type Maybe<T> = T | null

type Props = {
  audio: TAudio
  surah: Surah
  ayah: Maybe<Ayah>
  hidden: boolean
  className?: string
}

export function AudioControl({ audio, surah, ayah, hidden, className }: Props) {
  const { recitation } = useSettingsContext()

  if (!ayah || !audio.el || hidden) {
    return null
  }

  useEffect(() => {
    if (audio.isEnabled) {
      audio.setSrc({ path: `/${recitation}/${surah.id}/${ayah.id}.mp3` })
      audio.play()
    } else {
      audio.pause()
    }
  }, [ayah.id, recitation, audio.isEnabled])

  return (
    <>
      {audio.isEnabled && <SoundOnIcon className={className} onClick={() => audio.disable()} />}
      {!audio.isEnabled && <SoundOffIcon className={className} onClick={() => audio.enable()} />}
    </>
  )
}
