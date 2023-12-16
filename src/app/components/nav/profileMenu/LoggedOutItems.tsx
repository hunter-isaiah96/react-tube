import Link from "next/link"
import { LockOpenOutlined, PersonAddOutlined } from "@mui/icons-material"
import { ListItemIcon, MenuItem } from "@mui/material"

export default function LoggedOutItems() {
  return (
    <>
      <Link
        key='login'
        href='/login'
      >
        <MenuItem>
          <ListItemIcon>
            <LockOpenOutlined />
          </ListItemIcon>
          Log in
        </MenuItem>
      </Link>
      <Link
        key='register'
        href='/register'
      >
        <MenuItem>
          <ListItemIcon>
            <PersonAddOutlined />
          </ListItemIcon>
          Register
        </MenuItem>
      </Link>
    </>
  )
}
