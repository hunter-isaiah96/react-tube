"use client"
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { HomeOutlined, SubscriptionsOutlined, CameraRollOutlined } from "@mui/icons-material"
import { useRouter } from "next/navigation"
type NavDrawerType = {
  drawerOpen: boolean
  toggleMenu: Function
}
export default function NavDrawer(props: NavDrawerType) {
  const drawerWidth = 300
  const router = useRouter()
  const navigationItems = [
    { title: "Home", icon: <HomeOutlined />, to: "/" },
    { title: "Shorts", icon: <CameraRollOutlined />, to: "/" },
    { title: "Subscriptions", icon: <SubscriptionsOutlined />, to: "/" },
  ]
  const handleRouteCLick = (route: string) => {
    router.push(route)
    router.refresh()
  }
  return (
    <Drawer
      open={props.drawerOpen}
      onClose={() => props.toggleMenu()}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      disableScrollLock={true}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <List onClick={() => props.toggleMenu()}>
        {navigationItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleRouteCLick(item.to)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}
