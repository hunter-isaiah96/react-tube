"use client"
import { PreviewImage, base64ToBlob, getThumbnails } from "../helpers/video"
import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { Textarea } from "@mui/joy"
import { CloudUpload } from "@mui/icons-material"
import { useDropzone } from "react-dropzone"
import { UsersResponse } from "../pocketbase-types"
import { useAppSelector } from "@/store/store"
import db from "../helpers/connect"
import { LoadingButton } from "@mui/lab"
import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Upload",
//   description: "",
// }

const Upload = () => {
  const router = useRouter()
  const [title, setTitle] = useState<string>("Title")
  const [description, setDescription] = useState<string>("Description")
  const [videoFile, setVideoFile] = useState<Blob | null>(null)
  const [videoSrc, setVideoSrc] = useState<string>("")
  const [isUploading, setUploading] = useState<boolean>(false)
  const [videoThumbnails, setVideoThumbnails] = useState<PreviewImage[]>([])
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [selectedThumbnail, setSelectedThumbnail] = useState<number | null>(null)

  const user: UsersResponse | false = useAppSelector((state) => state.authReducer.value.user)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const url = URL.createObjectURL(file)
    setVideoFile(acceptedFiles[0])
    setVideoSrc(url)
    setTitle(file.name.split(".")[0])
    if (videoRef.current) {
      videoRef.current.load()
    }
    const thumbnails = await getThumbnails(url)
    setVideoThumbnails(thumbnails)
    setSelectedThumbnail(thumbnails[0].id)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleThumbnailSelection = (event: any) => {
    setSelectedThumbnail(event.target.value)
  }

  const uploadVideo = async () => {
    // setUploading(true)
    try {
      let thumb = videoThumbnails.find((thumbnail) => thumbnail.id == selectedThumbnail)
      console.log(videoFile, thumb, user)
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
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{
                border: "2px dashed #ccc",
                borderRadius: "4px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragActive ? "#eee" : "transparent",
                aspectRatio: 16 / 9,
              }}
              {...getRootProps()}
            >
              <input
                {...getInputProps()}
                accept='.mp4'
              />
              {isDragActive ? (
                <Typography variant='body1'>Drop the files here...</Typography>
              ) : (
                <Box>
                  <CloudUpload />
                  <Typography>
                    Drag and drop files here or click to select files,
                    <br /> MAX FILE SIZE: 100MB
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
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
            ) : (
              <Box sx={{ aspectRatio: 16 / 9 }}></Box>
            )}
          </Grid>
        </Grid>
        <Box marginBottom={1}>
          <FormControl component='fieldset'>
            <Typography
              variant='h6'
              gutterBottom
            >
              Thumbnail
            </Typography>

            <RadioGroup
              aria-label='images'
              name='images'
              value={selectedThumbnail}
              onChange={handleThumbnailSelection}
            >
              <Grid
                container
                spacing={1}
              >
                {videoThumbnails.map((image) => (
                  <Grid
                    item
                    key={image.id}
                    xs={3}
                  >
                    <FormControlLabel
                      style={{ margin: 0 }}
                      value={image.id}
                      control={<Radio sx={{ display: "none" }} />}
                      label={
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          style={{ margin: 0, border: selectedThumbnail == image.id ? "5px solid lightblue" : "2px solid transparent" }}
                          width='100%'
                          src={image.image}
                          alt={`Image ${image.id}`}
                        />
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box marginBottom={1}>
          <Typography
            variant='h6'
            gutterBottom
          >
            Title
          </Typography>
          <TextField
            label='Title'
            value={title}
            onChange={handleTitleChange}
            fullWidth
          ></TextField>
        </Box>
        <Box marginBottom={1}>
          <Typography
            variant='h6'
            gutterBottom
          >
            Description
          </Typography>
          <Textarea
            minRows={4}
            placeholder='Description'
            value={description}
            onChange={handleDescriptionChange}
          ></Textarea>
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

export default Upload
