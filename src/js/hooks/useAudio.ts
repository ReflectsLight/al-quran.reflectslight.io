export type TAudio = {
  el: HTMLAudioElement
  isEnabled: boolean
  isPlaying: boolean
  isPaused: boolean
  isWaiting: boolean
  isStalled: boolean
  isEnded: boolean
  hasError: boolean
  showStalledIcon: boolean
  enable: () => void
  disable: () => void
  pause: () => void
  play: () => void
  setSrc: ({ path }: { path: string }) => void
}

enum AudioState {
  Playing = "Playing",
  Paused = "Paused",
  Waiting = "Waiting",
  Stalled = "Stalled",
  Ended = "Ended",
  Error = "Error",
}

type AudioStateKey = keyof typeof AudioState

export function useAudio(): TAudio {
  const el = useMemo(() => new Audio(), [])
  const [enabled, setEnabled] = useState<boolean>(false)
  const [state, setState] = useState<AudioStateKey>(AudioState.Waiting)

  const showStalledIcon = useMemo(() => {
    if (enabled) {
      if (el.readyState < 2) {
        return true
      } else if (state === AudioState.Waiting) {
        return el.currentTime > 0
      } else {
        return state === AudioState.Stalled
      }
    } else {
      return false
    }
  }, [enabled, el.readyState, state])

  useEffect(() => {
    const onPause = () => setState(AudioState.Paused)
    const onWait = () => setState(AudioState.Waiting)
    const onStall = () => setState(AudioState.Stalled)
    const onResume = () => setState(AudioState.Playing)
    const onError = () => setState(AudioState.Error)
    const onEnded = () => setState(AudioState.Ended)
    el.addEventListener("pause", onPause)
    el.addEventListener("waiting", onWait)
    el.addEventListener("stalled", onStall)
    el.addEventListener("playing", onResume)
    el.addEventListener("ended", onEnded)
    el.addEventListener("error", onError)
    return () => {
      el.removeEventListener("pause", onPause)
      el.removeEventListener("waiting", onWait)
      el.removeEventListener("stalled", onStall)
      el.removeEventListener("playing", onResume)
      el.removeEventListener("ended", onEnded)
      el.removeEventListener("error", onError)
    }
  }, [el.src])

  return {
    el,
    isEnabled: enabled,
    isPlaying: state === AudioState.Playing,
    isPaused: state === AudioState.Paused,
    isWaiting: state === AudioState.Waiting,
    isStalled: state === AudioState.Stalled,
    isEnded: state === AudioState.Ended,
    hasError: state === AudioState.Error,
    showStalledIcon,
    enable() {
      setEnabled(true)
    },
    disable() {
      setEnabled(false)
    },
    pause() {
      el.pause()
    },
    play() {
      el.play()
    },
    setSrc({ path }: { path: string }) {
      el.src = [audioUrl, path, `?v=${commitId}`].join("")
    },
  }
}
