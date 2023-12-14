import "./style.scss"
import db from "@/app/helpers/connect"
import { Grid, List, Typography } from "@mui/material"
import PlayListItem from "@/app/components/playlist/PlayListItem"
import EngagementPanel from "@/app/components/video/engagement-panel/EngagementPanel"
import { Metadata } from "next"
import CommentsWrapper from "@/app/components/video/comments-section/CommentsWrapper"

type IVideo = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "",
  description: "",
}

async function Video({ params }: IVideo) {
  const video = await db.getVideo(params.id)
  metadata.title = video.title
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
            src={db.getFile({ collectionId: video.collectionId, recordId: video.id, fileName: video.video })}
            controls
          ></video>
          <Typography
            variant='h6'
            marginY={1}
          >
            {video.title}
          </Typography>
          <EngagementPanel video={video}></EngagementPanel>
          <CommentsWrapper></CommentsWrapper>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <List sx={{ overflow: "hidden" }}>
            {Array.from({ length: 20 }).map((item, index) => (
              <PlayListItem key={index}></PlayListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default Video
