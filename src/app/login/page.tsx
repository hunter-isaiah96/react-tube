"use client"
import { useState } from "react"
import { Avatar, CssBaseline, TextField, Grid, Box, Typography, Container, Link } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { setCookie } from "typescript-cookie"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import db from "@/app/helpers/connect"
const theme = createTheme()

type LoginData = {
  username: string
  password: string
}

export default function SignIn() {
  const [authData, setAuthData] = useState<LoginData>({
    username: "",
    password: "",
  })
  const [authenticating, setAuthenticating] = useState<boolean>(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setAuthData({
      ...authData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setAuthenticating(true)
      await db.client.collection("users").authWithPassword(authData.username, authData.password)
      setCookie("pb_auth", db.client.authStore.exportToCookie({ httpOnly: false }))
      window.location.href = "/"
    } catch (error) {
      setAuthenticating(false)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
        >
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={authData.username}
            onChange={handleInputChange}
            disabled={authenticating}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='password'
            value={authData.password}
            onChange={handleInputChange}
            disabled={authenticating}
          />

          <LoadingButton
            type='submit'
            fullWidth
            variant='contained'
            loading={authenticating}
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </LoadingButton>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href='#'
                variant='body2'
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href='/register'
                variant='body2'
              >
                {"Don't have an account? Register."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
