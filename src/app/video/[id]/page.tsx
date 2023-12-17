import { cache } from "react"
// External styles
import "./style.scss"

// Next.js
import { Metadata } from "next"

// Custom helpers
import db from "@/app/helpers/connect"

// Material-UI components
import { Grid, List, Typography } from "@mui/material"

// Custom components
import PlayListItem from "@/app/components/playlist/PlayListItem"
import EngagementPanel from "@/app/components/video/engagement-panel/EngagementPanel"
import CommentsWrapper from "@/app/components/video/comments-section/CommentsWrapper"
import VideoPlayer from "@/app/components/video/video-player/video-player"

type IVideo = {
  params: {
    id: string
  }
}
db.client.autoCancellation(false)

export const getVideoMetaData = cache(async (id: string) => {
  const video = await db.getVideo(id)
  return {
    title: video.title,
  }
})

export async function generateMetadata({ params }: IVideo): Promise<Metadata> {
  const video = await getVideoMetaData(params.id)
  return {
    title: video.title,
  }
}

export default async function Video({ params }: IVideo) {
  const videoData = db.getVideo(params.id)
  const commentsData = db.getComments(params.id)
  const [video, { items: comments, totalItems: totalComments }] = await Promise.all([videoData, commentsData])

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
          <VideoPlayer src={db.getFile({ collectionId: video.collectionId, recordId: video.id, fileName: video.video })}></VideoPlayer>
          <Typography
            variant='h6'
            marginY={1}
          >
            {video.title}
          </Typography>
          <EngagementPanel video={video}></EngagementPanel>
          <CommentsWrapper
            initialComments={comments}
            totalComments={totalComments}
          ></CommentsWrapper>
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
export const fetchCache = "default-no-store"
