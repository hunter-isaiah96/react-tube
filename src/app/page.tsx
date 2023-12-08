import { Box, Grid } from "@mui/material"
import PocketBase from "pocketbase"
import VideoPreview, { type Video } from "./components/VideoPreview"
const getVideos = async () => {
  const res = await fetch("http://127.0.0.1:8090/api/collections/videos/records")
  const data = await res.json()
  return data.items as Video[]
}

export default async function Home() {
  const videos = await getVideos()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={3}
      >
        {videos.map((item, index) => (
          <Grid
            item
            xs={12 / 5}
            key={item.id}
          >
            <VideoPreview video={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
