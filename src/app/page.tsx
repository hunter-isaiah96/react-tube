import { Box, Grid } from "@mui/material"
import VideoPreview from "./components/VideoPreview"
import db from "@/app/helpers/connect"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ReactTube",
  description: "",
}

export default async function Home() {
  const { items: videos } = await db.getVideos()
  return (
    <Grid
      container
      spacing={3}
    >
      {videos.map((item, index) => (
        <Grid
          item
          xs={12}
          md={4}
          xl={12 / 5}
          key={item.id}
        >
          <VideoPreview video={item} />
        </Grid>
      ))}
    </Grid>
  )
}

export const fetchCache = "default-no-store"
