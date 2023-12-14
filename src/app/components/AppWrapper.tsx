"use client"
import usePBAuth from "../hooks/usePBAuth"
import { setUser } from "@/store/features/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { UsersResponse } from "../pocketbase-types"
import db from "../helpers/connect"

function AppWrapper({ children }: { children: React.ReactNode }) {
  // const dispatch = useDispatch<AppDispatch>()
  usePBAuth()
  // dispatch(setUser(db.client.authStore.model as UsersResponse))
  return <div>{children}</div>
}

export default AppWrapper
