import "./style.scss"
import db from "@/app/connect"
import { Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import Image from "next/image"
type IVideo = {
  params: {
    id: string
  }
}

async function Video({ params }: IVideo) {
  const video = await db.getVideo(params.id)

  return (
    <>
      <Grid
        container
        paddingX={12}
      >
        <Grid
          item
          xs={9}
        >
          <video
            className='video-player'
            src={db.getFile(video.collectionId, video.id, video.video)}
            controls
          ></video>
          <Typography
            variant='h6'
            marginY={1}
          >
            {video.title}
          </Typography>
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
              <Button variant='contained'>Subscribe</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
        >
          <List sx={{ overflow: "hidden" }}>
            <ListItem alignItems='flex-start'>
              <Image
                width={100}
                height={100}
                className='recommended-thumbnail'
                alt='video thumbnail'
                src='https://images.pexels.com/photos/19346529/pexels-photo-19346529/free-photo-of-man-riding-motor-scooter-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              ></Image>
              <ListItemText
                sx={{ marginLeft: 2 }}
                primary={
                  <Typography
                    variant='subtitle2'
                    sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}
                  >
                    This is a very simple video for a very simple video
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant='caption'>rhynoboy2009</Typography>
                    <Typography variant='caption'>rhynoboy2009</Typography>
                  </>
                }
              ></ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  )
}

export default Video
