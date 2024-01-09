import { AppBar, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

export default function AuthNav() {
  return (
    <AppBar>
      <Toolbar>
        <Link href='/'>
          <Typography
            variant='h6'
            component='div'
            sx={{ marginRight: 2 }}
          >
            ReactTube
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
