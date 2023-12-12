import "./style.scss"
import db from "@/app/connect"
import { Grid, List, Typography } from "@mui/material"
import PlayListItem from "@/app/components/playlist/PlayListItem"
import EngagementPanel from "@/app/components/video/engagement-panel/EngagementPanel"
type IVideo = {
  params: {
    id: string
  }
}

async function Video({ params }: IVideo) {
  const video = await db.getVideo(params.id)

  return (
    <>
      <Grid
        container
        paddingX={12}
      >
        <Grid
          item
          xs={9}
        >
          <video
            className='video-player'
            src={db.getFile(video.collectionId, video.id, video.video)}
            controls
          ></video>
          <Typography
            variant='h6'
            marginY={1}
          >
            {video.title}
          </Typography>
          <EngagementPanel video={video}></EngagementPanel>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <List sx={{ overflow: "hidden" }}>
            {Array.from({ length: 3 }).map((item, index) => (
              <PlayListItem key={index}></PlayListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default Video
