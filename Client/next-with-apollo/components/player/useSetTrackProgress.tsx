import { useEffect } from 'react'

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)

type FncProps = {
    trackProgress: number;
    trackDuration : number;
    startTime : number;
    setTrackProgress: React.Dispatch<React.SetStateAction<number>>;
    trackPlaying: boolean;
}

export default ({
  trackProgress, trackDuration, startTime,
  setTrackProgress, trackPlaying,
} : FncProps) => {
  useEffect(() => {
    let animation: number = 0;
    if (trackPlaying) {
      animation = window.requestAnimationFrame(() => {
        const trackProgressPerc = ((Date.now() - startTime)) * 100 / trackDuration
        setTrackProgress(
          clamp(
            trackProgressPerc,
            0, 100,
          ),
        )
      })
    }
    return () => {
      window.cancelAnimationFrame(animation)
    }
  }, [
    trackPlaying,
    trackDuration,
    startTime,
    trackProgress,
  ])
}