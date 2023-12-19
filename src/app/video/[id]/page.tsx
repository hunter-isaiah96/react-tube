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
import { ListResult } from "pocketbase"
import { VideosResponse, VideosUsersResponse } from "@/app/pocketbase-types"

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

  const titleKeywords: string[] = video.title
    .toLowerCase()
    .split(" ")
    .map((keyword: string) => `title ~ "${keyword}"`)

  const recommendationFilters = {
    filter: `id != "${video.id}" && (${titleKeywords.join("||")})`, // Ensures excluding the video with the same ID
    expand: "user",
    sort: "@random",
  }

  if (video.tags && video.tags.length > 0) {
    recommendationFilters.filter = recommendationFilters.filter.slice(0, -1)
    const tagFilters: string[] = video.tags.map((tag: string) => `tags ~ "${tag}"`)
    recommendationFilters.filter += ` || ${tagFilters.join(" || ")})` // Combining tag filters using OR (||)
  }

  const { items: similarVideos }: ListResult<VideosUsersResponse> = await db.client.collection("videos").getList(1, 20, recommendationFilters)

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
