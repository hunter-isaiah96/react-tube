"use client"
import { PreviewImage } from "@/app/helpers/video"
import { FormControlLabel, Grid, Radio } from "@mui/material"
import React from "react"
type VideoThumbnailProps = {
  image: PreviewImage
  selectedThumbnail: string
}

export default function VideoThumbnail(props: VideoThumbnailProps) {
  return (
    <Grid
      item
      xs={3}
    >
      <FormControlLabel
        style={{ margin: 0 }}
        value={props.image.id}
        control={<Radio sx={{ display: "none" }} />}
        label={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            style={{ margin: 0, border: props.selectedThumbnail == props.image.id.toString() ? "5px solid lightblue" : "2px solid transparent" }}
            width='100%'
            src={props.image.image}
            alt={`Image ${props.image.id}`}
          />
        }
      />
    </Grid>
  )
}
