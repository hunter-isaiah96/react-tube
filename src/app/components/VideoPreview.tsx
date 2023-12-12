import { Card, CardContent, CardMedia, Typography, Grid, Avatar, CardActionArea } from "@mui/material"
import { type VideosUsersResponse } from "@/app/pocketbase-types"
import db from "@/app/connect"
import moment from "moment"
import Link from "next/link"

export default function VideoPreview(props: { video: VideosUsersResponse }) {
  return (
    <Card>
      <Link href={`/video/${props.video.id}`}>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='green iguana'
            height={150}
            image={props.video.thumbnail}
          />
          <CardContent>
            <Grid container>
              <Grid
                item
                sx={{ marginRight: 2 }}
              >
                <Avatar
                  alt={`${props.video.expand.user.name}'s avatar`}
                  src={db.getFile({ collectionId: props.video.expand.user.collectionId, recordId: props.video.expand.user.id, fileName: props.video.expand.user.avatar })}
                />
              </Grid>
              <Grid
                item
                xs
                sx={{ overflow: "hidden" }}
              >
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
                  {props.video.expand.user.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                >
                  {props.video.views} views &#x2022; {moment(props.video.created).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}
