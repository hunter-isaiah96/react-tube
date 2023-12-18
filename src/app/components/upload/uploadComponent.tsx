"use client"
import { PreviewImage, base64ToBlob } from "@/app//helpers/video"
import { useState, useRef, ChangeEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Autocomplete, Box, Chip, Grid, TextField } from "@mui/material"
import { CircularProgress } from "@mui/joy"
import { UsersResponse } from "@/app/pocketbase-types"
import { useAppSelector } from "@/store/store"
import db from "@/app//helpers/connect"
import { LoadingButton } from "@mui/lab"
import FileUploader from "@/app/components/upload/fileUploader"
import VideoThumbnails from "@/app/components/upload/videoThumbnails"

// Import necessary modules and dependencies...

export default function UploadComponent() {
  // State variables using useState hook
  const router = useRouter()
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [videoFile, setVideoFile] = useState<Blob | null>(null)
  const [videoSrc, setVideoSrc] = useState<string>("")
  const [isUploading, setUploading] = useState<boolean>(false)
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false)
  const [videoThumbnails, setVideoThumbnails] = useState<PreviewImage[]>([])
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("")

  // useRef hook
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const user: UsersResponse | false = useAppSelector((state) => state.authReducer.value.user)

  // Function invoked when a file is dropped for upload
  const onDropped = (file: File, src: string, thumbnails: PreviewImage[]) => {
    setVideoSrc(src)
    setVideoFile(file)
    setTitle(file.name.split(".")[0])
    setVideoThumbnails([...thumbnails, { id: "custom", image: "" }])
    setSelectedThumbnail(thumbnails[0].id)
    setLoadingVideo(false)
  }

  // Effect hook to update video source when videoSrc changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSrc
    }
  }, [videoSrc])

  // Function to handle thumbnail selection
  const handleThumbnailSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedThumbnail(event.target.value)
  }

  // Function to upload the video
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
      formData.append("tags", JSON.stringify(tags))
      formData.append("user", user.id)
      const videoRecord = await db.client.collection("videos").create(formData)
      router.push(`/video/${videoRecord.id}`)
      router.refresh()
    } catch (e) {
      // Error handling if upload fails
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
          marginBottom={1}
        >
          {/* File uploader component */}
          <Grid
            item
            xs={6}
          >
            <FileUploader
              setLoadingVideo={setLoadingVideo}
              onDropped={onDropped}
            ></FileUploader>
          </Grid>
          {/* Video display area */}
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
                Your browser does not support the video tag.
              </video>
            ) : loadingVideo ? (
              <CircularProgress size='lg' />
            ) : null}
          </Grid>
        </Grid>
        {/* Video thumbnails component */}
        {videoThumbnails.length > 0 ? (
          <Box marginBottom={1}>
            <VideoThumbnails
              selectedThumbnail={selectedThumbnail}
              setSelectedThumbnail={setSelectedThumbnail}
              handleThumbnailSelection={handleThumbnailSelection}
              setVideoThumbnails={setVideoThumbnails}
              videoThumbnails={videoThumbnails}
            ></VideoThumbnails>
          </Box>
        ) : null}
        {/* Title text field */}
        <TextField
          label='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        {/* Description text field */}
        <TextField
          multiline
          rows={4}
          label='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin='normal'
          fullWidth
        />
        {/* Tags autocomplete component */}
        <Autocomplete
          multiple
          onChange={(e, value) => setTags((state) => value)}
          options={[]}
          value={tags}
          freeSolo
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant='outlined'
                label={option}
                {...getTagProps({ index })}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label='Tags'
              margin='dense'
            />
          )}
        />
        {/* Upload button */}
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
