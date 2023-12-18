"use client"
import { Grid } from "@mui/material"
import UploadForm from "./uploadForm"
import FileUploader from "./fileUploader"
import { useUploadVideoStore } from "@/app/zustand/uploadVideo"
import { useEffect, useRef } from "react"
import VideoThumbnails from "./videoThumbnails"
import { CircularProgress } from "@mui/joy"

export default function UploadComponent() {
  const { videoFile, isLoadingVideo } = useUploadVideoStore()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current && videoFile) {
      videoRef.current.src = URL.createObjectURL(videoFile)
    }
  }, [videoFile])
  return (
    <Grid
      container
      justifyContent='center'
    >
      <Grid
        item
        xs={6}
      >
        <Grid
          container
          spacing={2}
          marginBottom={1}
        >
          <Grid
            item
            xs={6}
          >
            <FileUploader></FileUploader>
          </Grid>
          <Grid
            item
            display='flex'
            alignItems='center'
            justifyContent='center'
            xs={6}
          >
            {videoFile ? (
              <video
                style={{ aspectRatio: 16 / 9, width: "100%" }}
                ref={videoRef}
                controls
              >
                Your browser does not support the video tag.
              </video>
            ) : isLoadingVideo ? (
              <CircularProgress size='lg' />
            ) : null}
          </Grid>
        </Grid>
        <VideoThumbnails></VideoThumbnails>
        <UploadForm></UploadForm>
      </Grid>
    </Grid>
  )
}
