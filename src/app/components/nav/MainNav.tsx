"use client"
import { useEffect, useState } from "react"
import { AppBar, Toolbar, Typography, IconButton, Button, Box, styled } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { type UsersResponse } from "@/app/pocketbase-types"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"
import NavDrawer from "./NavDrawer"
import ProfileMenu from "./ProfileMenu"
import UploadVideo from "./UploadVideo"
import db from "@/app/connect"
import { width } from "@mui/system"

function MainNav() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [user, setUser] = useState<UsersResponse | null>(null)
  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const currentPath = usePathname()
  const disabledRoutes = ["/login", "/register"]
  useEffect(() => {
    setUser(db.client.authStore.model as UsersResponse)
    db.client.authStore.onChange(() => {
      setUser(db.client.authStore.model as UsersResponse)
    })
  }, [])

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
                  onClick={() => handleMenuToggle()}
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
                {user ? <UploadVideo /> : null}
                <ProfileMenu user={user}></ProfileMenu>
              </EqualBox>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <NavDrawer
            mobileOpen={mobileOpen}
            toggleMenu={handleMenuToggle}
          />
        </>
      ) : null}
    </>
  )
}
export default MainNav
