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
  if (!ayah || hidden) {
    return null
  }

  const { recitation } = useSettingsContext()
  const isEnabled = useMemo(() => {
    const pattern = new RegExp(`/${recitation}/${surah.id}/${ayah.id}\\.mp3`)
    return audio.isEnabled && pattern.test(audio.source)
  }, [recitation, surah.id, ayah.id, audio.isEnabled, audio.source])

  useEffect(() => {
    if (autoPlay) {
      audio.setSource({ path: `/${recitation}/${surah.id}/${ayah.id}.mp3` })
    }
  }, [autoPlay, recitation, ayah.id])

  useEffect(() => {
    if (audio.isEnabled) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [autoPlay, recitation, ayah.id, audio.isEnabled, audio.source])

  if (isEnabled) {
    return <SoundOnIcon className={className} onClick={() => audio.disable()} />
  } else {
    return (
      <SoundOffIcon
        className={className}
        onClick={() => {
          if (audio.isEnabled) {
            audio.setSource({ path: `/${recitation}/${surah.id}/${ayah.id}.mp3` })
          } else {
            audio.setSource({ path: `/${recitation}/${surah.id}/${ayah.id}.mp3` })
            audio.enable()
          }
        }}
      />
    )
  }
}
