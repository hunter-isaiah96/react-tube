"use client"
import { Avatar, FormControl, Grid, Input, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import PillButton from "../../ui/PillButton"
import { useState } from "react"
import { UsersResponse } from "@/app/pocketbase-types"
import { useAppSelector } from "@/store/store"
import db from "@/app/helpers/connect"

export default function SubmitComment() {
  const [commentsEnabled, setCommentsEnabled] = useState(false)
  const [comment, setComment] = useState("")
  const user: UsersResponse | false = useAppSelector((state) => state.authReducer.value.user)

  const handleCommentSubmit = () => {
    // Logic to handle comment submission goes here
    // For now, let's keep it empty
  }

  return (
    <div>
      <ListItemText sx={{ marginY: 2 }}>
        <Typography variant='h6'>134 Comments</Typography>
      </ListItemText>
      <ListItem disablePadding>
        <ListItemAvatar>
          <Avatar src={user ? db.getFile({ collectionId: user.collectionId, recordId: user.id, fileName: user.avatar }) : ""} />
        </ListItemAvatar>
        <FormControl fullWidth>
          <Input
            placeholder='Add a comment'
            value={comment}
            onFocus={() => {
              setCommentsEnabled(true)
            }}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormControl>
      </ListItem>
      <Grid
        container
        justifyContent='flex-end'
        spacing={1}
      >
        {commentsEnabled && (
          <Grid
            item
            sx={{ marginTop: 1 }}
          >
            <PillButton
              onClick={() => {
                setCommentsEnabled(false)
              }}
              sx={{ marginRight: 1 }}
              variant='text'
            >
              Cancel
            </PillButton>
            <PillButton
              disabled={comment.length < 1}
              onClick={handleCommentSubmit}
              color='primary'
            >
              Comment
            </PillButton>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
