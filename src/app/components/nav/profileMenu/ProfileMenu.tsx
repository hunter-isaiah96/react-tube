"use client"
import { useEffect, useState } from "react"
import { Box, Avatar, Menu, IconButton, Tooltip } from "@mui/material"
import { UsersResponse } from "@/app/pocketbase-types"
import db from "@/app/helpers/connect"
import LoggedInItems from "./LoggedInItems"
import LoggedOutItems from "./LoggedOutItems"

type UserProps = {
  user: UsersResponse | false
}

export default function ProfileMenu(props: UserProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [profileImage, setProfileImage] = useState<string>("")
  const open = Boolean(anchorEl)

  const toggleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (props.user) setProfileImage(db.getFile({ collectionId: props.user.collectionId, recordId: props.user.id, fileName: props.user.avatar }))
  }, [props.user])

  const menuSlotProps = {
    paper: {
      elevation: 0,
      sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.32))",
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
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title='Account settings'>
          <IconButton
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
            onClick={toggleProfileMenu}
          >
            {props.user ? (
              <Avatar
                alt={props.user.name}
                src={profileImage}
              ></Avatar>
            ) : (
              <Avatar></Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        aria-labelledby='profile-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        slotProps={menuSlotProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {props.user ? <LoggedInItems avatar={profileImage}></LoggedInItems> : <LoggedOutItems></LoggedOutItems>}
      </Menu>
    </>
  )
}
