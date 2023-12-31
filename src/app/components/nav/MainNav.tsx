"use client"
import { useState } from "react"
import { AppBar, Toolbar, Typography, IconButton, Box, styled } from "@mui/material"
import { Menu as MenuIcon, VideoCallOutlined } from "@mui/icons-material"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/app/zustand/user"
import SearchBar from "./SearchBar"
import NavDrawer from "./NavDrawer"
import ProfileMenu from "./profileMenu/ProfileMenu"

export default function MainNav() {
  const currentPath = usePathname()
  const router = useRouter()
  const [drawerOpen, setdrawerOpen] = useState<boolean>(false)
  const { user } = useAuthStore()

  const handleMenuToggle = () => {
    setdrawerOpen(!drawerOpen)
  }

  const disabledRoutes = ["/login", "/register"]

  const EqualBox = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
  }))

  return (
    <>
      {!disabledRoutes.includes(currentPath) ? (
        <>
          <AppBar>
            <Toolbar>
              <EqualBox>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  sx={{ mr: 2 }}
                  onClick={handleMenuToggle}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{ marginRight: 2 }}
                >
                  ReactTube
                </Typography>
              </EqualBox>
              <EqualBox>
                <Box sx={{ width: "100%" }}>
                  <SearchBar />
                </Box>
              </EqualBox>
              <EqualBox sx={{ justifyContent: "end" }}>
                {user ? (
                  <IconButton
                    color='inherit'
                    onClick={() => router.push("/upload")}
                  >
                    <VideoCallOutlined></VideoCallOutlined>
                  </IconButton>
                ) : null}
                <ProfileMenu></ProfileMenu>
              </EqualBox>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <NavDrawer
            drawerOpen={drawerOpen}
            toggleMenu={handleMenuToggle}
          />
        </>
      ) : null}
    </>
  )
}
