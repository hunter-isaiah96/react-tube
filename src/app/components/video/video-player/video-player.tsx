"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

type VideoPlayerProps = {
  src: string
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const videoPlayer = useRef<HTMLVideoElement | null>(null)
  const searchParams = useSearchParams()
  const time = parseInt(searchParams.get("t") || "")

  useEffect(() => {
    if (time !== null && videoPlayer.current) {
      videoPlayer.current.currentTime = time || 0
    }
  }, [time])

  useEffect(() => {
    const videoPlayerRef = videoPlayer.current // Capture the current value in a local variable

    const handleCanPlay = () => {
      if (videoPlayerRef) {
        videoPlayerRef.muted = false
      }
    }

    if (videoPlayerRef) {
      videoPlayerRef.addEventListener("canplay", handleCanPlay)
    }

    return () => {
      if (videoPlayerRef) {
        videoPlayerRef.removeEventListener("canplay", handleCanPlay)
      }
    }
  }, [])

  return (
    <video
      id='videoPlayer'
      className='video-player'
      ref={videoPlayer}
      src={props.src}
      muted
      autoPlay
      controls
    ></video>
  )
}
