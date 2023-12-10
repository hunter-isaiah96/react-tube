import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import PocketBase from "pocketbase"
import { POCKET_BASE_URL } from "./app/connect"
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("pb_auth")
  const pb = new PocketBase(POCKET_BASE_URL)
  if (cookie) {
    pb.authStore.loadFromCookie(`${cookie.value}`)
  }
  const isValidCookie = pb.authStore.isValid
  if (!isValidCookie) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
  NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
}
