"use client"
import { useEffect } from "react"
import db from "@/app/helpers/connect"
import { getCookie } from "typescript-cookie"
import { setUser } from "@/store/features/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { UsersResponse } from "../pocketbase-types"

function usePBAuth() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    db.client.authStore.loadFromCookie(getCookie("pb_auth") || "")
    dispatch(setUser(db.client.authStore.model as UsersResponse))
  }, [])
}

export default usePBAuth
