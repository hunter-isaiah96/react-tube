"use client"
import { Box, Typography } from "@mui/material"
import { useDropzone } from "react-dropzone"
import { useCallback } from "react"
import { CloudUpload } from "@mui/icons-material"
import { getThumbnails } from "@/app/helpers/video"
import { useUploadVideoStore } from "@/app/zustand/uploadVideo"

export default function FileUploader() {
  const { setVideoFile, setVideoThumbnails, setLoadingVideo, setTitle, setSelectedThumbnail } = useUploadVideoStore()
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setLoadingVideo(true)
        const file = acceptedFiles[0]
        const src = URL.createObjectURL(file)
        const thumbnails = await getThumbnails(src)
        setVideoFile(acceptedFiles[0])
        setTitle(file.name.split(".")[0])
        setVideoThumbnails([...thumbnails, { id: "custom", image: "" }])
        setSelectedThumbnail(thumbnails[0].id)
      } catch (error) {
      } finally {
        setLoadingVideo(false)
      }
    },
    [setVideoFile, setVideoThumbnails, setLoadingVideo, setTitle, setSelectedThumbnail]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
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
  )
}
