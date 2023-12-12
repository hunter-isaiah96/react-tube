"use client"
import "./style.scss"
import { Avatar, Box, Button, Grid, ListItem, ListItemAvatar, ListItemText, styled } from "@mui/material"
import db from "@/app/connect"
import { VideosUsersResponse } from "@/app/pocketbase-types"
import { useState } from "react"
import { CheckCircle, PlaylistAdd, Share, ThumbDownAlt, ThumbDownAltOutlined, ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material"
type Video = {
  video: VideosUsersResponse
}

const PillButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
}))

function EngagementPanel(props: Video) {
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const [likes, setLikes] = useState<number>(100)
  const [dislikes, setDislikes] = useState<number>(4)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isDisliked, setIsDisliked] = useState<boolean>(false)
  const actionMargin = 1
  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
    if (isDisliked) {
      setIsDisliked(false)
      setDislikes(dislikes - 1)
    }
  }

  const handleDislikeClick = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1)
    } else {
      setDislikes(dislikes + 1)
    }
    setIsDisliked(!isDisliked)
    if (isLiked) {
      setIsLiked(false)
      setLikes(likes - 1)
    }
  }

  const video = props.video
  return (
    <Grid
      container
      alignItems={"center"}
    >
      <Grid item>
        <ListItem disablePadding>
          <ListItemAvatar>
            <Avatar src={db.getFile(video.expand.user.collectionId, video.expand.user.id, video.expand.user.avatar)}></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={video.expand.user.name}
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
            setSubscribed(!subscribed)
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
          flexGrow={1}
          display='flex'
          justifyContent='end'
          container
          spacing={1}
        >
          <Grid item>
            <Box>
              <PillButton
                startIcon={isLiked ? <ThumbUpAlt></ThumbUpAlt> : <ThumbUpAltOutlined></ThumbUpAltOutlined>}
                variant='contained'
                sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: "1px solid rgba(0,0,0,0.1)" }}
                onClick={() => {
                  handleLikeClick()
                }}
                disableElevation
              >
                {likes}
              </PillButton>
              <PillButton
                startIcon={isDisliked ? <ThumbDownAlt></ThumbDownAlt> : <ThumbDownAltOutlined></ThumbDownAltOutlined>}
                variant='contained'
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                onClick={() => {
                  handleDislikeClick()
                }}
                disableElevation
              >
                {dislikes}
              </PillButton>
            </Box>
          </Grid>
          <Grid item>
            <PillButton
              startIcon={<Share></Share>}
              variant='contained'
            >
              Share
            </PillButton>
          </Grid>
          <Grid item>
            <PillButton
              startIcon={<PlaylistAdd></PlaylistAdd>}
              variant='contained'
            >
              Save
            </PillButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EngagementPanel
