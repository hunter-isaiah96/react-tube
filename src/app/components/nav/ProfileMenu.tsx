import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from "@mui/material"
import { Settings, Logout, LockOpenOutlined, PersonAddOutlined } from "@mui/icons-material"
import { UsersResponse } from "@/app/pocketbase-types"
import db from "@/app/connect"
import { removeCookie } from "typescript-cookie"
import Link from "next/link"

export default function ProfileMenu(props: { user: UsersResponse | false }) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const signOut = async () => {
    removeCookie("pb_auth")
    db.client.authStore.clear()
    router.push("/login")
  }
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title='Account settings'>
          <IconButton
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {props.user ? (
              <Avatar
                alt={props.user.name}
                src={db.getFile({ collectionId: props.user.collectionId, recordId: props.user.id, fileName: props.user.avatar })}
              ></Avatar>
            ) : (
              <Avatar></Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {props.user
          ? [
              <MenuItem
                key='profile'
                onClick={handleClose}
              >
                <Avatar /> Profile
              </MenuItem>,
              <Divider key='divider' />,
              <MenuItem
                key='settings'
                onClick={handleClose}
              >
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                Settings
              </MenuItem>,
              <MenuItem
                key='logout'
                onClick={() => {
                  handleClose()
                  signOut()
                }}
              >
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>,
            ]
          : [
              <Link
                key='login'
                href='/login'
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <LockOpenOutlined />
                  </ListItemIcon>
                  Log in
                </MenuItem>
              </Link>,
              <Link
                key='register'
                href='/register'
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAddOutlined />
                  </ListItemIcon>
                  Register
                </MenuItem>
              </Link>,
            ]}
      </Menu>
    </>
  )
}
