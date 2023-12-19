"use client"
import { Avatar, FormControl, Grid, Input, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import PillButton from "../../ui/PillButton"
import { useState } from "react"
import { CommentsResponse } from "@/app/pocketbase-types"
import db from "@/app/helpers/connect"
import { useParams } from "next/navigation"
import { useAuthStore } from "@/app/zustand/user"
interface SubmitCommentProps {
  addComment: (newComment: CommentsResponse) => void
}

export default function SubmitComment({ addComment }: SubmitCommentProps) {
  const params = useParams()
  const { user } = useAuthStore()
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")

  const handleCommentSubmit = async () => {
    // Create a new comment object
    if (!user) return
    try {
      const newComment = (await db.client.collection("comments").create(
        {
          user: user.id,
          comment: comment,
          video: params.id,
        },
        { expand: "user" }
      )) as CommentsResponse
      addComment(newComment)
      setComment("")
      setCommentsEnabled(false)
    } catch (e) {}
  }

  return (
    <div>
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
