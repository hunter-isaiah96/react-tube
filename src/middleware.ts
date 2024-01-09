import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import PocketBase from "pocketbase"
import { POCKET_BASE_URL } from "./app/helpers/connect"

export function middleware(req: NextRequest) {
  const response = NextResponse.next()
  const cookie = req.cookies.get("pb_auth")
  const pb = new PocketBase(POCKET_BASE_URL)
  if (cookie) {
    pb.authStore.loadFromCookie(cookie.value)
  }
  if (pb.authStore.isValid) {
    response.headers.set("user", JSON.stringify(pb.authStore.model))
  }
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matchers: ["/video/:id"],
}
