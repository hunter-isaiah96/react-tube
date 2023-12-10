"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, CssBaseline, TextField, Grid, Box, Typography, Container, Link } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { setCookie } from "typescript-cookie"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import db from "@/app/connect"
const theme = createTheme()

export default function SignIn() {
  const [username, setUsername] = useState("rhynoboy2009")
  const [password, setPassword] = useState("isaiah96")
  const [authenticating, setAuthenticating] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setAuthenticating(true)
      // await db.authenticate(username, password)
      await db.client.collection("users").authWithPassword(username, password)
      setCookie("pb_auth", db.client.authStore.exportToCookie({ httpOnly: false }))
      router.push("/")
    } catch (error) {
      setAuthenticating(false)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component='main'
        maxWidth='xs'
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={authenticating}
            />

            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              loading={authenticating}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
                  href='/signup'
                  variant='body2'
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
