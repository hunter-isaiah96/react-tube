"use client"
import "./style.scss"
import { Avatar, Box, Divider, Grid, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import db from "@/app/helpers/connect"
import { VideosUsersResponse } from "@/app/pocketbase-types"
import { useReducer, useState } from "react"
import { CheckCircle, ContentCut, PlaylistAdd, Reply, ThumbDownAlt, ThumbDownAltOutlined, ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material"
import PillButton from "@/app/components/ui/PillButton"
import { useAuthStore } from "@/app/zustand/user"
type Video = {
  video: VideosUsersResponse
}

type RatingState = {
  likes: number
  dislikes: number
  isLiked: boolean
  isDisliked: boolean
}

type Action = { type: "LIKE" } | { type: "DISLIKE" }

const ratingState: RatingState = {
  likes: 100,
  dislikes: 4,
  isLiked: false,
  isDisliked: false,
}

const ratingReducer = (state: RatingState, action: Action): RatingState => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        likes: state.isLiked ? state.likes - 1 : state.likes + 1,
        isLiked: !state.isLiked,
        dislikes: state.isDisliked ? state.dislikes - 1 : state.dislikes,
        isDisliked: false,
      }
    case "DISLIKE":
      return {
        ...state,
        dislikes: state.isDisliked ? state.dislikes - 1 : state.dislikes + 1,
        isDisliked: !state.isDisliked,
        likes: state.isLiked ? state.likes - 1 : state.likes,
        isLiked: false,
      }
    default:
      return state
  }
}

export default function EngagementPanel({ video }: Video) {
  const { user } = useAuthStore()
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const [state, dispatch] = useReducer(ratingReducer, ratingState)
  const { likes, dislikes, isLiked, isDisliked } = state

  const subscribeToUser = async () => {
    try {
      if (!subscribed) {
        const newSubscription = await db.client.collection("subscriptions").create({
          follower: user?.id,
          follows: video.user,
        })
      }
      setSubscribed(!subscribed)
    } catch (e) {}
  }

  return (
    <>
      <Grid
        container
        alignItems={"center"}
      >
        <Grid item>
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar src={db.getFile({ collectionId: video.expand.user.collectionId, recordId: video.expand.user.id, fileName: video.expand.user.avatar })}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={video.expand.user.username}
              secondary='1.2M Subscribers'
            />
          </ListItem>
        </Grid>
        <Grid
          item
          marginLeft={5}
        >
          <PillButton
            startIcon={subscribed ? <CheckCircle></CheckCircle> : null}
            color={subscribed ? "success" : "primary"}
            variant='contained'
            onClick={() => {
              subscribeToUser()
            }}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </PillButton>
        </Grid>
        <Grid
          flexGrow={1}
          item
        >
          <Grid
            container
            flexGrow={1}
            display='flex'
            justifyContent='end'
            spacing={1}
          >
            <Grid item>
              <Box>
                <PillButton
                  startIcon={isLiked ? <ThumbUpAlt></ThumbUpAlt> : <ThumbUpAltOutlined></ThumbUpAltOutlined>}
                  sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: "1px solid rgba(0,0,0,0.1)" }}
                  onClick={() => dispatch({ type: "LIKE" })}
                >
                  {likes}
                </PillButton>
                <PillButton
                  startIcon={isDisliked ? <ThumbDownAlt></ThumbDownAlt> : <ThumbDownAltOutlined></ThumbDownAltOutlined>}
                  sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  onClick={() => dispatch({ type: "DISLIKE" })}
                >
                  {dislikes}
                </PillButton>
              </Box>
            </Grid>
            <Grid item>
              <PillButton startIcon={<Reply></Reply>}>Share</PillButton>
            </Grid>
            <Grid item>
              <PillButton startIcon={<ContentCut></ContentCut>}>Clip</PillButton>
            </Grid>
            <Grid item>
              <PillButton startIcon={<PlaylistAdd></PlaylistAdd>}>Save</PillButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }}></Divider>
    </>
  )
}
