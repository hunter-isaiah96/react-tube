"use client"
import { useEffect, useState } from "react"
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { type UsersResponse } from "@/app/pocketbase-types"
import SearchBar from "./SearchBar"
import NavDrawer from "./NavDrawer"
import ProfileMenu from "./ProfileMenu"
import UploadVideo from "./UploadVideo"
import db from "@/app/connect"

function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<UsersResponse | null>(null)
  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  useEffect(() => {
    setUser(db.client.authStore.model as UsersResponse)
    db.client.authStore.onChange(() => {
      setUser(db.client.authStore.model as UsersResponse)
    })
  }, [])
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => handleMenuToggle()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            ReactTube
          </Typography>
          <SearchBar />
          {user ? <UploadVideo /> : null}
          {user ? <ProfileMenu user={user}></ProfileMenu> : null}
        </Toolbar>
      </AppBar>
      <NavDrawer
        mobileOpen={mobileOpen}
        toggleMenu={handleMenuToggle}
      />
    </>
  )
}
export default MainNav
