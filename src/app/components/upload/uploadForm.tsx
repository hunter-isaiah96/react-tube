import { useUploadVideoStore } from "@/app/zustand/uploadVideo"
import { LoadingButton } from "@mui/lab"
import { Autocomplete, Box, Chip, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { base64ToBlob } from "@/app/helpers/video"
import db from "@/app//helpers/connect"
import { UsersResponse } from "@/app/pocketbase-types"
import { useAppSelector } from "@/store/store"

export default function UploadForm() {
  const router = useRouter()
  const { title, setTitle, description, setDescription, tags, setTags, videoThumbnails, selectedThumbnail, videoFile, setIsUploadingVideo, isUploadingVideo } =
    useUploadVideoStore()
  const user: UsersResponse | false = useAppSelector((state) => state.authReducer.value.user)

  const uploadVideo = async () => {
    try {
      setIsUploadingVideo(true)
      let thumb = videoThumbnails.find((thumbnail) => thumbnail.id == selectedThumbnail)
      if (!videoFile || !thumb || !user) return
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
      // setUploading(false)
      setIsUploadingVideo(false)
    }
  }
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
        onClick={uploadVideo}
        disabled={isUploadingVideo}
        variant='contained'
        fullWidth
      >
        Upload
      </LoadingButton>
    </Box>
  )
}
