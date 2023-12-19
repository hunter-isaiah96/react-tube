"use client"
import { Logout } from "@mui/icons-material"
import { Avatar, Divider, ListItemIcon, MenuItem } from "@mui/material"
import { removeCookie } from "typescript-cookie"
import db from "@/app/helpers/connect"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/zustand/user"

type LoggedInItemsProps = {
  avatar: string
}

export default function LoggedInItems(props: LoggedInItemsProps) {
  const { setUser } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    removeCookie("pb_auth")
    db.client.authStore.clear()
    setUser(null)
    router.push("/login")
  }
  return (
    <>
      <MenuItem
        key='profile'
        // onClick={() => props.handleClose()}
      >
        <Avatar src={props.avatar} /> Profile
      </MenuItem>
      <Divider />
      <MenuItem
        key='logout'
        onClick={() => {
          handleLogout()
        }}
      >
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  )
}
