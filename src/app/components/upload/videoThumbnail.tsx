"use client"
import { PreviewImage } from "@/app/helpers/video"
import { useUploadVideoStore } from "@/app/zustand/uploadVideo"
import { FormControlLabel, Grid, Radio } from "@mui/material"
import React from "react"
type VideoThumbnailProps = {
  image: PreviewImage
}

export default function VideoThumbnail({ image }: VideoThumbnailProps) {
  const { selectedThumbnail } = useUploadVideoStore()
  return (
    <Grid
      item
      xs={3}
    >
      <FormControlLabel
        style={{ margin: 0 }}
        value={image.id}
        control={<Radio sx={{ display: "none" }} />}
        label={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            style={{ margin: 0, border: selectedThumbnail == image.id.toString() ? "5px solid lightblue" : "2px solid transparent" }}
            width='100%'
            src={image.image}
            alt={`Image ${image.id}`}
          />
        }
      />
    </Grid>
  )
}
