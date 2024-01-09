import db from "@/app/helpers/connect"
import { UsersResponse, VideosUsersResponse } from "@/app/pocketbase-types"
import { redirect } from "next/navigation"

import { headers } from "next/headers"
import { ListResult } from "pocketbase"

export const getUserFromHeaders = (): UsersResponse | null => {
  const headersList = headers()
  let user: UsersResponse | string | null = headersList.get("user")
  if (user !== null) {
    user = JSON.parse(user!)
    return user as UsersResponse
  }
  return null
}

export const getVideoDetails = async (id: string) => {
  try {
    const [video, comments] = await Promise.all([db.getVideo(id), db.getComments(id)])
    if (!video) {
      redirect("/")
    }
    return {
      video,
      comments,
    }
  } catch (e) {
    return {
      video: null,
      comments: null,
    }
  }
}

export const getSimilarVideos = async (video: VideosUsersResponse) => {
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
  const { items }: ListResult<VideosUsersResponse> = await db.client.collection("videos").getList(1, 20, recommendationFilters)
  return {
    similarVideos: items,
  }
}

export const checkSubscription = async (subscriberId: string = "", subscribedToId: string = ""): Promise<boolean> => {
  if (!subscriberId || !subscribedToId) {
    return false
  }
  try {
    await db.getSubscription(subscriberId, subscribedToId)
    return true
    // isSubscribed = true
  } catch (e) {
    return false
  }
}

export const getTotalSubscribers = async (id: string = ""): Promise<number> => {
  try {
    const { totalItems } = await db.getTotalSubscribers(id)
    return totalItems
  } catch (error) {
    return 0
  }
}
