import { FormControl, Grid, RadioGroup, Typography } from "@mui/material"
import React, { ChangeEvent } from "react"
import VideoThumbnail from "./videoThumbnail"
import { PreviewImage } from "@/app/helpers/video"

type VideoThumbnailsProps = {
  selectedThumbnail: string
  handleThumbnailSelection: (event: ChangeEvent<HTMLInputElement>) => void
  videoThumbnails: PreviewImage[]
}

export default function VideoThumbnails({ selectedThumbnail, handleThumbnailSelection, videoThumbnails }: VideoThumbnailsProps) {
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
              {videoThumbnails.map((image) => (
                <VideoThumbnail
                  key={image.id}
                  selectedThumbnail={selectedThumbnail}
                  image={image}
                ></VideoThumbnail>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      ) : null}
    </>
  )
}
