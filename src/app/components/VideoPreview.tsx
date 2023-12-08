import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import moment from "moment"

export interface Video {
  id: number
  title: string
  thumbnail: string
  views: number
  user: string
  created: string
}

function VideoPreview(props: { video: Video }) {
  return (
    <Card>
      <CardMedia
        component='img'
        alt='green iguana'
        height={150}
        image={props.video.thumbnail}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant='h6'
          component='div'
          sx={{ marginBottom: 0 }}
          noWrap
        >
          {props.video.title}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {props.video.user}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {props.video.views} views &#x2022; {moment(props.video.created).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default VideoPreview
