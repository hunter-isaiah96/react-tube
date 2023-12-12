"use client"
import { Button, ButtonProps, ThemeProvider, createTheme, styled } from "@mui/material"
import { grey } from "@mui/material/colors"
const theme = createTheme({
  palette: {
    secondary: {
      main: grey[900],
    },
  },
})

const PillButtonProps = {
  disableElevation: true,
  color: "secondary" as "secondary",
  variant: "contained" as "contained",
}

const StyledPillButton = styled(Button)(() => ({
  borderRadius: 25,
}))

export default function PillButton(props: ButtonProps) {
  return (
    <ThemeProvider theme={theme}>
      <StyledPillButton
        {...PillButtonProps}
        {...props}
      >
        {props.children}
      </StyledPillButton>
    </ThemeProvider>
  )
}
