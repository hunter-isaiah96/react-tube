"use client"
import { ThumbDownAlt, ThumbDownAltOutlined, ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material"
import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useReducer, useState } from "react"
type Comment = {
  message: string
  username: string
  likes: number
  isLiked?: boolean
  isDisliked?: boolean
}

type Action = { type: "LIKE" } | { type: "DISLIKE" }

type UserComment = {
  comment: Comment
}

const ratingReducer = (state: Comment, action: Action): Comment => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        likes: state.isLiked ? state.likes - 1 : state.likes + 1,
        isLiked: !state.isLiked,
        isDisliked: false,
      }
    case "DISLIKE":
      return {
        ...state,
        isDisliked: !state.isDisliked,
        likes: state.isLiked ? state.likes - 1 : state.likes,
        isLiked: false,
      }
    default:
      return state
  }
}

export default function Comment(props: UserComment) {
  const [state, dispatch] = useReducer(ratingReducer, props.comment)
  const { likes, isLiked, isDisliked } = state

  return (
    <ListItem
      disablePadding
      sx={{ paddingTop: 1 }}
      alignItems='flex-start'
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography
            variant='body2'
            sx={{ fontWeight: "medium" }}
          >
            @{props.comment.username}
          </Typography>
        }
        secondary={
          <Box>
            <Typography variant='body2'>{props.comment.message}</Typography>
            <Box
              display='inline'
              marginRight={1}
            >
              <IconButton
                onClick={() => {
                  dispatch({ type: "LIKE" })
                }}
                size='small'
                sx={{ marginRight: "2px" }}
              >
                {isLiked ? <ThumbUpAlt fontSize='small'></ThumbUpAlt> : <ThumbUpAltOutlined fontSize='small'></ThumbUpAltOutlined>}
              </IconButton>
              <Typography variant='caption'>{likes}</Typography>
            </Box>
            <IconButton
              size='small'
              onClick={() => {
                dispatch({ type: "DISLIKE" })
              }}
            >
              {isDisliked ? <ThumbDownAlt fontSize='small'></ThumbDownAlt> : <ThumbDownAltOutlined fontSize='small'></ThumbDownAltOutlined>}
            </IconButton>
          </Box>
        }
      />
    </ListItem>
  )
}
