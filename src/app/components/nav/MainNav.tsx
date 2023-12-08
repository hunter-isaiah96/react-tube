"use client"
import { useState } from "react"
import { AppBar, Avatar, Toolbar, Typography, IconButton } from "@mui/material"
import { Menu as MenuIcon, VideoCallOutlined } from "@mui/icons-material"
import SearchBar from "./SearchBar"
import NavDrawer from "./NavDrawer"

function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen)
  }
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
          <IconButton
            color='inherit'
            aria-label='add video'
            sx={{ mr: 2 }}
          >
            <VideoCallOutlined />
          </IconButton>
          <Avatar alt='Remy Sharp'>I</Avatar>
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
