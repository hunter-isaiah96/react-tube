import { Box, Grid } from "@mui/material"
import VideoPreview from "./components/VideoPreview"
import db from "@/app/connect"

export default async function Home() {
  const { items: videos } = await db.getVideos()
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
