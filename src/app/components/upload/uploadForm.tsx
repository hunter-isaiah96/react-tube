"use client"
import { useUploadVideoStore, resetUploadVideoForm } from "@/app/zustand/uploadVideo"
import { LoadingButton } from "@mui/lab"
import { Autocomplete, Box, Chip, TextField } from "@mui/material"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
export default function UploadForm() {
  // const router = useRouter()
  const router = useRouter()
  const { title, setTitle, description, setDescription, tags, setTags, isUploadingVideo, uploadVideo } = useUploadVideoStore()
  const handleUploadVideo = async () => {
    try {
      const uploadedVideo = await uploadVideo()
      router.push(`/video/${uploadedVideo.id}`)
      router.refresh()
    } catch (error) {}
  }
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return (
    <Box marginTop={1}>
      <TextField
        label='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isUploadingVideo}
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
        disabled={isUploadingVideo}
        fullWidth
      />
      {/* Tags autocomplete component */}
      <Autocomplete
        multiple
        onChange={(e, value) => setTags(value)}
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
            disabled={isUploadingVideo}
          />
        )}
      />
      <LoadingButton
        onClick={handleUploadVideo}
        disabled={isUploadingVideo}
        variant='contained'
        fullWidth
      >
        Upload
      </LoadingButton>
    </Box>
  )
}
