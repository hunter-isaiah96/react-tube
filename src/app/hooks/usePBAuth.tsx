"use client"
import { useEffect } from "react"
import db from "@/app/helpers/connect"
import { getCookie } from "typescript-cookie"
import { type UsersResponse } from "../pocketbase-types"
import { useAuthStore } from "../zustand/user"

function usePBAuth() {
  const { setUser } = useAuthStore()
  useEffect(() => {
    db.client.authStore.loadFromCookie(getCookie("pb_auth") || "")
    setUser(db.client.authStore.model as UsersResponse)
  }, [setUser])
}

export default usePBAuth
