"use client"
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { HomeOutlined, SubscriptionsOutlined, CameraRollOutlined } from "@mui/icons-material"
type NavDrawerType = {
  mobileOpen: boolean
  toggleMenu: Function
}
function NavDrawer(props: NavDrawerType) {
  const drawerWidth = 300
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label='mailbox folders'
    >
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
          {[
            { title: "Home", icon: <HomeOutlined /> },
            { title: "Shorts", icon: <CameraRollOutlined /> },
            { title: "Subscriptions", icon: <SubscriptionsOutlined /> },
          ].map((item, index) => (
            <ListItem
              key={item.title}
              disablePadding
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
    </Box>
  )
}

export default NavDrawer
