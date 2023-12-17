"use client"
import { Box, Typography } from "@mui/material"
import { useDropzone } from "react-dropzone"
import { useCallback } from "react"
import { CloudUpload } from "@mui/icons-material"
import { getThumbnails } from "@/app/helpers/video"
type FileUploaderProps = {
  onDropped: Function
  setLoadingVideo: Function
}
export default function FileUploader({ onDropped, setLoadingVideo }: FileUploaderProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoadingVideo(true)
      const file = acceptedFiles[0]
      const src = URL.createObjectURL(file)
      const thumbnails = await getThumbnails(src)
      onDropped(acceptedFiles[0], src, thumbnails)
    },
    [onDropped, setLoadingVideo]
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
