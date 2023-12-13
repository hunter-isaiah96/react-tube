import { ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material"
import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
type Comment = {
  message: string
  username: string
  likes: number
}
type UserComment = {
  comment: Comment
}

export default function Comment(props: UserComment) {
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
                size='small'
                sx={{ marginRight: "2px" }}
              >
                <ThumbUpAltOutlined fontSize='small' />
              </IconButton>
              <Typography variant='caption'>{[props.comment.likes]}</Typography>
            </Box>
            <IconButton size='small'>
              <ThumbDownAltOutlined fontSize='small' />
            </IconButton>
          </Box>
        }
      />
    </ListItem>
  )
}
