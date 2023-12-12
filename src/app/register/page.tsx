"use client"
import { useState } from "react"
import { Avatar, CssBaseline, TextField, Grid, Box, Typography, Container, Link } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import Person from "@mui/icons-material/Person"

export default function SignIn() {
  const [username, setUsername] = useState<string>("rhynoboy2009")
  const [password, setPassword] = useState<string>("isaiah96")
  const [authenticating, setAuthenticating] = useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setAuthenticating(true)
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
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <Person />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
        >
          Sign up
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
            Sign Up
          </LoadingButton>
          <Grid container>
            <Grid
              item
              xs
            ></Grid>
            <Grid item>
              <Link
                href='/login'
                variant='body2'
              >
                {"Already have an account? Log in."}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
