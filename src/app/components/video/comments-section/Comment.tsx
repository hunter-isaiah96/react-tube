"use client"
import db from "@/app/helpers/connect"
import { CommentsResponse } from "@/app/pocketbase-types"
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import Moment from "react-moment"
type UserComment = {
  comment: CommentsResponse
}

export default function Comment({ comment }: UserComment) {
  // const [state, dispatch] = useReducer(ratingReducer, props.comment)

  return (
    <ListItem
      disablePadding
      sx={{ paddingTop: 1 }}
      alignItems='flex-start'
    >
      <ListItemAvatar>
        <Avatar src={db.getFile({ collectionId: comment.expand.user.collectionId, recordId: comment.expand.user.id, fileName: comment.expand.user.avatar })} />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <>
            <Typography variant='subtitle2'>
              @{comment.expand.user.username}{" "}
              <Moment
                date={comment.created}
                style={{ fontWeight: "normal" }}
                fromNow
              />
            </Typography>
          </>
        }
        secondary={<Typography variant='body2'>{comment.comment}</Typography>}
        // secondary={
        //   <Box>
        //     <Typography variant='body2'>{props.comment.comment}</Typography>
        //     {/* <Box
        //       display='inline'
        //       marginRight={1}
        //     >
        //       <IconButton
        //         onClick={() => {
        //           dispatch({ type: "LIKE" })
        //         }}
        //         size='small'
        //         sx={{ marginRight: "2px" }}
        //       >
        //         {isLiked ? <ThumbUpAlt fontSize='small'></ThumbUpAlt> : <ThumbUpAltOutlined fontSize='small'></ThumbUpAltOutlined>}
        //       </IconButton>
        //       <Typography variant='caption'>{likes}</Typography>
        //     </Box>
        //     <IconButton
        //       size='small'
        //       onClick={() => {
        //         dispatch({ type: "DISLIKE" })
        //       }}
        //     >
        //       {isDisliked ? <ThumbDownAlt fontSize='small'></ThumbDownAlt> : <ThumbDownAltOutlined fontSize='small'></ThumbDownAltOutlined>}
        //     </IconButton> */}
        //   </Box>
        // }
      />
    </ListItem>
  )
}
