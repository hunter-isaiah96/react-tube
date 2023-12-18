import { ListItem, ListItemText, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { VideosUsersResponse } from "@/app/pocketbase-types"
import moment from "moment"
import db from "@/app/helpers/connect"
type PlayListItemProps = {
  video: VideosUsersResponse
}
export default function PlayListItem({ video }: PlayListItemProps) {
  return (
    <Link href={`/video/${video.id}`}>
      <ListItem alignItems='flex-start'>
        <Image
          unoptimized
          width='0'
          height='0'
          className='recommended-thumbnail'
          alt='video thumbnail'
          src={db.getFile({ collectionId: video.collectionId, recordId: video.id, fileName: video.thumbnail })}
          style={{ objectFit: "contain" }}
        ></Image>
        <ListItemText
          sx={{ marginLeft: 1 }}
          primary={
            <Typography
              variant='subtitle2'
              className='text-ellipsis two-line capitalize'
            >
              {video.title}
            </Typography>
          }
          secondary={
            <>
              <Typography
                className='text-ellipsis'
                variant='caption'
              >
                {video.expand.user.username}
              </Typography>
              <Typography
                className='text-ellipsis'
                variant='caption'
              >
                {video.views} views &#x2022; {moment(video.created).fromNow()}
              </Typography>
            </>
          }
        ></ListItemText>
      </ListItem>
    </Link>
  )
}
