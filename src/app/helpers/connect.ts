import PocketBase, { ListResult } from "pocketbase"
import { Collections, CommentsResponse, SubscriptionsResponse, UsersResponse, type VideosUsersResponse } from "@/app/pocketbase-types"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export const POCKET_BASE_URL = "http://127.0.0.1:8090"
type File = {
  collectionId: string
  recordId: string
  fileName: string
}

class DBClient {
  client: PocketBase
  constructor() {
    this.client = new PocketBase(POCKET_BASE_URL)
  }

  async authenticate(username: string, password: string) {
    return await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
  }

  async getUser(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth")
    if (!cookie) {
      return null
    }
    this.client.authStore.loadFromCookie(`pb_auth=${cookie?.value}` || "")
    return this.client.authStore.model as UsersResponse
  }

  async getVideo(videoId: string): Promise<VideosUsersResponse> {
    return this.client.collection(Collections.Videos).getFirstListItem<VideosUsersResponse>(`id ~ "${videoId}"`, { expand: "user" })
  }

  async getVideos(): Promise<ListResult<VideosUsersResponse>> {
    return this.client.collection(Collections.Videos).getList<VideosUsersResponse>(1, 20, { expand: "user" })
  }

  async getRecommendations(video: VideosUsersResponse): Promise<ListResult<VideosUsersResponse>> {
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

    return this.client.collection(Collections.Videos).getList(1, 20, recommendationFilters)
  }

  async getComments(videoId: string): Promise<ListResult<CommentsResponse>> {
    return this.client.collection(Collections.Comments).getList<CommentsResponse>(1, 20, {
      filter: `video="${videoId}"`,
      expand: "user",
      sort: "-created",
    })
  }

  async getSubscription(subscriberId: string, subscribedToId: string): Promise<SubscriptionsResponse> {
    return this.client.collection(Collections.Subscriptions).getFirstListItem(`subscriber = "${subscriberId}" && subscribedTo = "${subscribedToId}"`)
  }

  async getTotalSubscribers(subscribedToId: string): Promise<ListResult<SubscriptionsResponse>> {
    return this.client.collection(Collections.Subscriptions).getList(1, 1, {
      filter: `subscribedTo = "${subscribedToId}"`,
    })
  }

  async setSubscription(subscriberId: string = "", subscribedToId: string = "", subscribe: boolean): Promise<boolean> {
    if (!subscriberId || !subscribedToId) {
      return false
    }
    try {
      if (subscribe) {
        await db.client.collection("subscriptions").create({
          subscriber: subscriberId,
          subscribedTo: subscribedToId,
        })
        return true
      } else {
        const subscription = await this.getSubscription(subscriberId, subscribedToId)
        await db.client.collection("subscriptions").delete(subscription.id)
        return false
      }
    } catch (error) {
      return false
    }
  }

  async setReaction(type: "LIKE" | "DISLIKE", user: string = "", video: string) {
    if (!user) {
      return
    }
    const reactionRecords = await this.client.collection(Collections.Likesdislikes).getList(1, 1, {
      filter: `user="${user}" && video="${video}"`,
    })
    switch (type) {
      case "LIKE":
        try {
          if (reactionRecords.items.length > 0) {
            const reactionRecord = reactionRecords.items[0]
            if (reactionRecord.isLike) {
              return await this.client.collection(Collections.Likesdislikes).delete(reactionRecord.id)
            } else if (!reactionRecord.isLike) {
              return await this.client.collection(Collections.Likesdislikes).update(reactionRecord.id, {
                isLike: true,
              })
            }
          } else {
            return await this.client.collection(Collections.Likesdislikes).create({
              user,
              video,
              isLike: true,
            })
          }
        } catch (error) {
          console.log(error)
        }
        break
      case "DISLIKE":
        if (reactionRecords.items.length > 0) {
          const reactionRecord = reactionRecords.items[0]
          if (!reactionRecord.isLike) {
            return await this.client.collection(Collections.Likesdislikes).delete(reactionRecord.id)
          } else if (reactionRecord.isLike) {
            return await this.client.collection(Collections.Likesdislikes).update(reactionRecord.id, {
              isLike: false,
            })
          }
        } else {
          return await this.client.collection(Collections.Likesdislikes).create({
            user,
            video,
            isLike: false,
          })
        }
        break
    }
  }

  getFile(file: File) {
    return file.fileName ? `${this.client.baseUrl}/api/files/${file.collectionId}/${file.recordId}/${file.fileName}` : ""
  }
}

export const db = new DBClient()

export default db

// const pb = new PocketBase("http://127.0.0.1:8090")

// export const db = pb

// export const authenticate = async (username: string, password: string) => {
//   return await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   })
//   // console.log(auth)
// }

// export const isAuthenticated = (cookieStore: ReadonlyRequestCookies) => {
//   const cookie = cookieStore.get("pb_auth")
//   if (!cookie) {
//     return false
//   }
//   // loadFromCookie applies the cookie data before checking the user is authenticated
//   pb.authStore.loadFromCookie(cookie?.value || "")
//   return pb.authStore.isValid || false
// }

// export const getUser = async (cookieStore: ReadonlyRequestCookies) => {
//   const cookie = cookieStore.get("pb_auth")
//   if (!cookie) {
//     return false
//   }
//   db.authStore.loadFromCookie(cookie?.value || "")
//   return db.authStore.model as UsersResponse
// }

// export const register = async (email: string, password: string, passwordConfirm: string) => {
//   try {
//     const userData = await pb.collection("users").create({ email, password, passwordConfirm })
//   } catch (error) {}
// }

// export const getVideos = async (): Promise<ListResult<VideosUsersResponse>> => {
//   return pb.collection(Collections.Videos).getList<VideosUsersResponse>(1, 20, { expand: "user" })
// }

// export const getVideo = async (videoId: string): Promise<VideosUsersResponse> => {
//   return pb.collection(Collections.Videos).getFirstListItem<VideosUsersResponse>(`id ~ "${videoId}"`, { expand: "user" })
// }

// export const getFile = (collectionId: string, recordId: string, fileName: string): any => {
//   return fileName ? `${pb.baseUrl}/api/files/${collectionId}/${recordId}/${fileName}` : ""
// }

// export const logout = async () => {
//   console.log("Logging Out")
//   return await pb.authStore.clear()
// }
