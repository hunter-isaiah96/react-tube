import PocketBase, { ListResult } from "pocketbase"
import { Collections, CommentsResponse, UsersResponse, type VideosUsersResponse } from "@/app/pocketbase-types"
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
    this.client = new PocketBase("http://127.0.0.1:8090")
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
      return false
    }
    this.client.authStore.loadFromCookie(`pb_auth=${cookie?.value}` || "")
    return this.client.authStore.model as UsersResponse
  }

  async getVideos(): Promise<ListResult<VideosUsersResponse>> {
    return this.client.collection(Collections.Videos).getList<VideosUsersResponse>(1, 20, { expand: "user" })
  }
  async getVideo(videoId: string): Promise<VideosUsersResponse> {
    return this.client.collection(Collections.Videos).getFirstListItem<VideosUsersResponse>(`id ~ "${videoId}"`, { expand: "user" })
  }

  async getComments(videoId: string): Promise<ListResult<CommentsResponse>> {
    return this.client.collection(Collections.Comments).getList<CommentsResponse>(1, 20, {
      filter: `video="${videoId}"`,
      expand: "user",
      sort: "-created",
    })
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
