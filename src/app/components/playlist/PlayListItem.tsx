import { ListItem, ListItemText, Typography } from "@mui/material"
import {} from "@mui/material"
import Image from "next/image"
import { faker } from "@faker-js/faker"
import Link from "next/link"

function PlayListItem() {
  return (
    <Link href='#'>
      <ListItem alignItems='flex-start'>
        <Image
          unoptimized
          width={100}
          height={100}
          className='recommended-thumbnail'
          alt='video thumbnail'
          src={faker.image.urlLoremFlickr({ category: "nature" })}
        ></Image>
        <ListItemText
          sx={{ marginLeft: 1 }}
          primary={
            <Typography
              variant='subtitle2'
              className='text-ellipsis two-line capitalize'
            >
              {faker.word.words({ count: { min: 5, max: 10 } })}
            </Typography>
          }
          secondary={
            <>
              <Typography
                className='text-ellipsis'
                variant='caption'
              >
                rhynoboy2009
              </Typography>
              <Typography
                className='text-ellipsis'
                variant='caption'
              >
                100k views &#x2022; 2 Days ago
              </Typography>
            </>
          }
        ></ListItemText>
      </ListItem>
    </Link>
  )
}

export default PlayListItem
