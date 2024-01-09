import "./style.scss"

import PlayListItem from "@/app/components/playlist/PlayListItem"
import CommentsWrapper from "@/app/components/video/comments-section/CommentsWrapper"
import EngagementPanel from "@/app/components/video/engagement-panel/EngagementPanel"
import VideoPlayer from "@/app/components/video/video-player/video-player"
import db from "@/app/helpers/connect"
import { UsersResponse, VideosUsersResponse } from "@/app/pocketbase-types"
import { Grid, List, Typography } from "@mui/material"
import { Metadata } from "next"
import { checkSubscription, getSimilarVideos, getTotalSubscribers, getUserFromHeaders, getVideoDetails } from "./VideoService"

type IVideo = {
  params: {
    id: string
    name: string
  }
}

db.client.autoCancellation(false)

export async function generateMetadata({ params }: IVideo): Promise<Metadata> {
  try {
    const video = await db.getVideo(params.id)
    return {
      title: video.title,
    }
  } catch (e) {
    return {
      title: "",
    }
  }
}

export default async function Video({ params }: IVideo) {
  const { video, comments } = await getVideoDetails(params.id)
  if (!video) return
  const user: UsersResponse | null = getUserFromHeaders()
  const { similarVideos } = await getSimilarVideos(video)
  const totalSubscribers = await getTotalSubscribers(video.expand.user.id)
  const isSubscribed = await checkSubscription(user?.id, video.expand.user.id)
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
          <EngagementPanel
            video={video}
            totalSubscribers={totalSubscribers}
            isSubscribed={isSubscribed}
          ></EngagementPanel>
          <CommentsWrapper
            initialComments={comments.items}
            totalComments={comments.totalItems}
          ></CommentsWrapper>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <List sx={{ overflow: "hidden" }}>
            {similarVideos.map((video: VideosUsersResponse) => (
              <PlayListItem
                key={video.id}
                video={video}
              ></PlayListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export const fetchCache = "default-no-store"
