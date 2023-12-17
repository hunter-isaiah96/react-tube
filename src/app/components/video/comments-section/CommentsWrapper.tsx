"use client"
import { Box, List, ListItemText, Typography } from "@mui/material"
import Comment from "./Comment"
import SubmitComment from "./SubmitComment"
import { CommentsResponse, UsersResponse } from "@/app/pocketbase-types"
import { useState } from "react"
import { useAppSelector } from "@/store/store"

type CommentsWrapperProps = {
  initialComments: CommentsResponse[]
  totalComments: number
}
export default function CommentsWrapper({ initialComments, totalComments }: CommentsWrapperProps) {
  const [comments, setComments] = useState<CommentsResponse[]>(initialComments)
  const [commentsCount, setCommentsCount] = useState<number>(totalComments)
  const user: UsersResponse | false = useAppSelector((state) => state.authReducer.value.user)

  const addComment = (newComment: CommentsResponse) => {
    setComments([newComment, ...comments])
    setCommentsCount(commentsCount + 1)
  }

  return (
    <Box>
      <ListItemText sx={{ marginY: 2 }}>
        <Typography variant='h6'>
          {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
        </Typography>
      </ListItemText>
      {user ? <SubmitComment addComment={addComment} /> : null}
      <List>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
          ></Comment>
        ))}
      </List>
    </Box>
  )
}
