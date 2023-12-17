"use client"
import { PreviewImage, base64ToBlob } from "@/app//helpers/video"
import { useState, useRef, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Box, Grid, TextField } from "@mui/material"
import { CircularProgress } from "@mui/joy"
import { UsersResponse } from "@/app/pocketbase-types"
import { useAppSelector } from "@/store/store"
import db from "@/app//helpers/connect"
import { LoadingButton } from "@mui/lab"
import FileUploader from "@/app/components/upload/fileUploader"
import VideoThumbnails from "@/app/components/upload/videoThumbnails"

export default function UploadComponent() {
  // State variables using useState hook
  const router = useRouter()
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [videoFile, setVideoFile] = useState<Blob | null>(null)
  const [videoSrc, setVideoSrc] = useState<string>("")
  const [isUploading, setUploading] = useState<boolean>(false)
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false)
  const [videoThumbnails, setVideoThumbnails] = useState<PreviewImage[]>([])
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("")
  // useRef hook
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const user: UsersResponse | false = useAppSelector((state) => state.authReducer.value.user)

  const onDropped = (file: File, src: string, thumbnails: PreviewImage[]) => {
    setVideoSrc(src)
    setVideoFile(file)
    setTitle(file.name.split(".")[0])
    setVideoThumbnails(thumbnails)
    setSelectedThumbnail(thumbnails[0].id)
    if (videoRef.current) {
      videoRef.current.load()
    }
    setLoadingVideo(false)
  }

  const handleThumbnailSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedThumbnail(event.target.value)
  }

  const uploadVideo = async () => {
    try {
      let thumb = videoThumbnails.find((thumbnail) => thumbnail.id == selectedThumbnail)
      if (!videoFile || !thumb || !user) return
      setUploading(true)
      const formData = new FormData()
      formData.append("video", videoFile)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("thumbnail", base64ToBlob(thumb.image.split(",")[1]))
      formData.append("user", user.id)
      const videoRecord = await db.client.collection("videos").create(formData)
      router.push(`/video/${videoRecord.id}`)
      router.refresh()
    } catch (e) {
    } finally {
      setUploading(false)
    }
  }

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
          marginBottom={2}
        >
          <Grid
            item
            xs={6}
          >
            <FileUploader
              setLoadingVideo={setLoadingVideo}
              onDropped={onDropped}
            ></FileUploader>
          </Grid>
          <Grid
            item
            xs={6}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            {videoSrc ? (
              <video
                style={{ aspectRatio: 16 / 9, width: "100%" }}
                ref={videoRef}
                controls
              >
                <source
                  src={videoSrc}
                  type='video/mp4'
                />
                Your browser does not support the video tag.
              </video>
            ) : loadingVideo ? (
              <CircularProgress size='lg' />
            ) : null}
          </Grid>
        </Grid>
        {videoThumbnails.length > 0 ? (
          <Box marginBottom={1}>
            <VideoThumbnails
              selectedThumbnail={selectedThumbnail}
              handleThumbnailSelection={handleThumbnailSelection}
              videoThumbnails={videoThumbnails}
            ></VideoThumbnails>
          </Box>
        ) : null}

        <Box marginBottom={1}>
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginBottom={1}>
          <TextField
            multiline
            minRows={2}
            rows={4}
            label='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Box>
        <LoadingButton
          onClick={uploadVideo}
          variant='contained'
          loading={isUploading}
          fullWidth
        >
          Upload
        </LoadingButton>
      </Grid>
    </Grid>
  )
}
