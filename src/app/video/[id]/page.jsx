import db from "@/app/connect"
import { Grid } from "@mui/material"
async function Video({ params }) {
  const video = await db.getVideo(params.id)

  // const router = useRouter()
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ marginX: 8 }}
      >
        <Grid
          item
          xs={8}
        >
          <video
            style={{ aspectRatio: 16 / 9 }}
            src={db.getFile(video.collectionId, video.id, video.video)}
            controls
          ></video>
        </Grid>
        <Grid
          item
          xs={4}
        ></Grid>
      </Grid>
    </>
  )
}

export default Video
