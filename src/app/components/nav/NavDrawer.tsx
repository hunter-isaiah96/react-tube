"use client"
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { HomeOutlined, SubscriptionsOutlined, CameraRollOutlined } from "@mui/icons-material"
import Link from "next/link"
type NavDrawerType = {
  mobileOpen: boolean
  toggleMenu: Function
}
export default function NavDrawer(props: NavDrawerType) {
  const drawerWidth = 300
  const navigationItems = [
    { title: "Home", icon: <HomeOutlined />, to: "/" },
    { title: "Shorts", icon: <CameraRollOutlined />, to: "/" },
    { title: "Subscriptions", icon: <SubscriptionsOutlined />, to: "/" },
  ]
  return (
    <Drawer
      open={props.mobileOpen}
      onClose={() => props.toggleMenu()}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <List onClick={() => props.toggleMenu()}>
        {navigationItems.map((item, index) => (
          <Link
            key={item.title}
            href={item.to}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}
