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
  autoPlay?: boolean
  className?: string
}

export function AudioControl({ audio, surah, ayah, hidden, autoPlay = true, className }: Props) {
  const { recitation } = useSettingsContext()

  if (!ayah || !audio.el || hidden) {
    return null
  }

  useEffect(() => {
    if (autoPlay) {
      audio.setSource({ path: `/${recitation}/${surah.id}/${ayah?.id}.mp3` })
    }
  }, [autoPlay, recitation, ayah.id])

  useEffect(() => {
    if (audio.isEnabled) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [autoPlay, recitation, ayah.id, audio.isEnabled])

  return (
    <>
      {audio.isEnabled && <SoundOnIcon className={className} onClick={() => audio.disable()} />}
      {!audio.isEnabled && (
        <SoundOffIcon
          className={className}
          onClick={() => {
            audio.setSource({ path: `/${recitation}/${surah.id}/${ayah?.id}.mp3` })
            audio.enable()
          }}
        />
      )}
    </>
  )
}
