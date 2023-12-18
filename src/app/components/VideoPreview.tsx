import { Card, CardContent, CardMedia, Typography, Grid, Avatar, CardActionArea } from "@mui/material"
import { type VideosUsersResponse } from "@/app/pocketbase-types"
import db from "@/app/helpers/connect"
import Link from "next/link"
import moment from "moment"

export default function VideoPreview({ video }: { video: VideosUsersResponse }) {
  return (
    <Card>
      <Link href={`/video/${video.id}`}>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='green iguana'
            height={180}
            image={db.getFile({ collectionId: video.collectionId, recordId: video.id, fileName: video.thumbnail })}
          />
          <CardContent>
            <Grid container>
              <Grid
                item
                sx={{ marginRight: 2 }}
              >
                <Avatar
                  alt={`${video.expand.user.username}'s avatar`}
                  src={db.getFile({ collectionId: video.expand.user.collectionId, recordId: video.expand.user.id, fileName: video.expand.user.avatar })}
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
                  {video.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                >
                  {video.expand.user.username}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                >
                  {video.views} views &#x2022; {moment(video.created).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}
