"use client"
import { useState } from "react"
import { AppBar, Toolbar, Typography, IconButton, Box, styled } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"
import NavDrawer from "./NavDrawer"
import ProfileMenu from "./ProfileMenu"
import UploadVideo from "./UploadVideo"
import { useAppSelector } from "@/store/store"

export default function MainNav() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const user = useAppSelector((state) => state.authReducer.value.user)
  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const currentPath = usePathname()
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
