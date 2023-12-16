"use client"
import { AppDispatch } from "@/store/store"
import { Logout, Settings } from "@mui/icons-material"
import { Avatar, Divider, ListItemIcon, MenuItem } from "@mui/material"
import { useDispatch } from "react-redux"
import { removeCookie } from "typescript-cookie"
import db from "@/app/helpers/connect"
import { setUser } from "@/store/features/auth-slice"
import { useRouter } from "next/navigation"

type LoggedInItemsProps = {
  avatar: string
}

export default function LoggedInItems(props: LoggedInItemsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleLogout = async () => {
    removeCookie("pb_auth")
    db.client.authStore.clear()
    dispatch(setUser(false))
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
        key='settings'
        // onClick={() => props.handleClose()}
      >
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Settings
      </MenuItem>
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
