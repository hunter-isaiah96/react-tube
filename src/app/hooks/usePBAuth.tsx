import { useEffect } from "react"
import db from "@/app/connect"
import { getCookie } from "typescript-cookie"

function usePBAuth() {
  useEffect(() => {
    db.client.authStore.loadFromCookie(getCookie("pb_auth") || "")
  }, [])
}

export default usePBAuth
