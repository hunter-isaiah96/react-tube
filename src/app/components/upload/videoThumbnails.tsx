import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material"
import React, { ChangeEvent } from "react"
import VideoThumbnail from "./videoThumbnail"
import { PreviewImage } from "@/app/helpers/video"
import CustomThumbnail from "./customThumbnail"

type VideoThumbnailsProps = {
  selectedThumbnail: string
  setSelectedThumbnail: (id: string) => void
  setVideoThumbnails: (thumnails: PreviewImage[]) => void
  handleThumbnailSelection: (event: ChangeEvent<HTMLInputElement>) => void
  videoThumbnails: PreviewImage[]
}

export default function VideoThumbnails({
  selectedThumbnail,
  setSelectedThumbnail,
  handleThumbnailSelection,
  setVideoThumbnails,
  videoThumbnails,
}: VideoThumbnailsProps) {
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
                    selectedThumbnail={selectedThumbnail}
                    image={image}
                  ></VideoThumbnail>
                ) : (
                  <Grid
                    key={image.id}
                    item
                    xs={3}
                  >
                    <CustomThumbnail
                      selectedThumbnail={selectedThumbnail}
                      setSelectedThumbnail={setSelectedThumbnail}
                      setVideoThumbnails={setVideoThumbnails}
                      videoThumbnails={videoThumbnails}
                    ></CustomThumbnail>
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
