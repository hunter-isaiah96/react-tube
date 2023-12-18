"use client"
import { CloudUpload } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { blobToBase64 } from "@/app/helpers/video"
import { useUploadVideoStore } from "@/app/zustand/uploadVideo"

export default function CustomThumbnail() {
  const { selectedThumbnail, setSelectedThumbnail, setVideoThumbnails, videoThumbnails } = useUploadVideoStore()
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const updatedThumbnails = [...videoThumbnails]
      const customImage = await blobToBase64(acceptedFiles[0])
      if (updatedThumbnails.length > 0) {
        updatedThumbnails[updatedThumbnails.length - 1] = { id: "custom", image: customImage }
      }
      setVideoThumbnails(updatedThumbnails)
      setSelectedThumbnail("custom")
    },
    [setSelectedThumbnail, setVideoThumbnails, videoThumbnails]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#eee" : "transparent",
        aspectRatio: 16 / 9,
      }}
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        accept='image/png, image/jpeg'
      />
      {videoThumbnails[3].image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          style={{ margin: 0, border: selectedThumbnail == "custom" ? "5px solid lightblue" : "2px solid transparent" }}
          width='100%'
          src={videoThumbnails[3].image}
          alt={`Custom Thumbnail`}
        />
      ) : (
        <Box>
          <CloudUpload />
          <Typography>Upload Custom Thumbnail</Typography>
        </Box>
      )}
    </Box>
  )
}
