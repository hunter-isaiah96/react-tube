"use client"
import PillButton from "@/app/components/ui/PillButton"
import db from "@/app/helpers/connect"
import { UsersResponse, VideosUsersResponse } from "@/app/pocketbase-types"
import { useAuthStore } from "@/app/zustand/user"
import { CheckCircle, ThumbDownAlt, ThumbDownAltOutlined, ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material"
import { Avatar, Box, Divider, Grid, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { useRouter } from "next/navigation"
import { useReducer, useState } from "react"
import "./style.scss"
type Video = {
  video: VideosUsersResponse
  isSubscribed: boolean
  totalSubscribers: number
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

interface SubscriptionButtonProps {
  user: UsersResponse | null
  subscribed: boolean
  handleSubscription: () => void
}

function SubscriptionButton({ user, subscribed, handleSubscription }: SubscriptionButtonProps) {
  if (user)
    return (
      <PillButton
        startIcon={subscribed ? <CheckCircle></CheckCircle> : null}
        color={subscribed ? "success" : "primary"}
        variant='contained'
        onClick={() => {
          handleSubscription()
        }}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </PillButton>
    )
  return null
}

export default function EngagementPanel({ video, isSubscribed, totalSubscribers }: Video) {
  const { user } = useAuthStore()
  const router = useRouter()
  const [subscribed, setSubscribed] = useState<boolean>(isSubscribed)
  const [state, dispatch] = useReducer(ratingReducer, ratingState)
  const { likes, dislikes, isLiked, isDisliked } = state

  const handleSubscription = async () => {
    const subscribe = await db.setSubscription(user?.id, video.user, !subscribed)
    setSubscribed(subscribe)
  }

  const toggleRating = (type: "LIKE" | "DISLIKE") => {
    if (user) {
      dispatch({ type })
      return
    }
    router.push("/login")
  }

  const reactToVideo = async (type: "LIKE" | "DISLIKE") => {
    if (user) {
      await db.setReaction(type, user?.id, video.id)
      dispatch({ type })
      return
    }
    router.push("/login")
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
              secondary={`${totalSubscribers} subscriber${totalSubscribers === 1 ? "" : "s"}`}
            />
          </ListItem>
        </Grid>
        <Grid
          item
          marginLeft={5}
        >
          <SubscriptionButton
            user={user}
            subscribed={subscribed}
            handleSubscription={handleSubscription}
          ></SubscriptionButton>
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
                  onClick={() => reactToVideo("LIKE")}
                >
                  {likes}
                </PillButton>
                <PillButton
                  startIcon={isDisliked ? <ThumbDownAlt></ThumbDownAlt> : <ThumbDownAltOutlined></ThumbDownAltOutlined>}
                  sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  onClick={() => reactToVideo("DISLIKE")}
                >
                  {dislikes}
                </PillButton>
              </Box>
            </Grid>
            {/* <Grid item>
              <PillButton startIcon={<Reply></Reply>}>Share</PillButton>
            </Grid>
            <Grid item>
              <PillButton startIcon={<ContentCut></ContentCut>}>Clip</PillButton>
            </Grid>
            <Grid item>
              <PillButton startIcon={<PlaylistAdd></PlaylistAdd>}>Save</PillButton>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }}></Divider>
    </>
  )
}
