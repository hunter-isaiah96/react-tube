import * as React from "react"
import { DialogTitle, Dialog, IconButton } from "@mui/material"
import { VideoCallOutlined } from "@mui/icons-material"
export interface DialogProps {
  open: boolean
  onClose: (value: string) => void
}

function SimpleDialog(props: DialogProps) {
  const handleClose = () => {
    props.onClose("")
  }

  const handleListItemClick = (value: string) => {
    // onClose(value)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      maxWidth={"md"}
      disableScrollLock={true}
      fullWidth
    >
      <DialogTitle>Upload Video</DialogTitle>
    </Dialog>
  )
}

export default function UploadVideo() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
  }

  return (
    <div>
      <IconButton
        color='inherit'
        onClick={handleClickOpen}
      >
        <VideoCallOutlined></VideoCallOutlined>
      </IconButton>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}
