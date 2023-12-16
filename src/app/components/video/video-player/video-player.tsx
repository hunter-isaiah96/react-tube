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

  return (
    <video
      id='videoPlayer'
      className='video-player'
      ref={videoPlayer}
      src={props.src}
      controls
    ></video>
  )
}
