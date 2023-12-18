import { FormControl, Grid, RadioGroup, Typography } from "@mui/material"
import React, { ChangeEvent } from "react"
import VideoThumbnail from "./videoThumbnail"
import { useUploadVideoStore } from "@/app/zustand/uploadVideo"
import CustomThumbnail from "./customThumbnail"

export default function VideoThumbnails() {
  const { selectedThumbnail, setSelectedThumbnail, videoThumbnails } = useUploadVideoStore()
  const handleThumbnailSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedThumbnail(event.target.value)
  }
  return (
    <>
      {videoThumbnails.length > 0 ? (
        <FormControl component='fieldset'>
          <Typography variant='h6'>Thumbnails</Typography>
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
              {videoThumbnails.map((image) =>
                image.id != "custom" ? (
                  <VideoThumbnail
                    key={image.id}
                    image={image}
                  ></VideoThumbnail>
                ) : (
                  <Grid
                    key={image.id}
                    item
                    xs={3}
                  >
                    <CustomThumbnail></CustomThumbnail>
                  </Grid>
                )
              )}
            </Grid>
          </RadioGroup>
        </FormControl>
      ) : null}
    </>
  )
}
