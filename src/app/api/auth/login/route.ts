import { NextResponse } from "next/server"
import db from "@/app/helpers/connect"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  try {
    await db.client.collection("users").authWithPassword(username, password)
    cookies().set("pb_auth", db.client.authStore.exportToCookie())
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}
