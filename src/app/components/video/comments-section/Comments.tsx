"use client"
import { Avatar, Box, Grid, Input, ListItem, ListItemAvatar, ListItemText, Typography, FormControl, FormLabel, List, IconButton } from "@mui/material"

import PillButton from "@/app/components/ui/PillButton"
import { useState } from "react"
import { useAppSelector } from "@/store/store"
import db from "@/app/connect"
import { UsersResponse } from "@/app/pocketbase-types"
import { ThumbDownAlt, ThumbDownAltOutlined, ThumbUpAlt, ThumbUpAltOutlined } from "@mui/icons-material"
export default function Comments() {
  const [commentsEnabled, setCommentsEnabled] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const user: UsersResponse | false = useAppSelector((state) => state.authReducer.value.user)

  return (
    <Box>
      <ListItemText>
        <Typography variant='h6'>134 Comments</Typography>
      </ListItemText>
      <ListItem disablePadding>
        <ListItemAvatar>
          {user ? <Avatar src={db.getFile({ collectionId: user.collectionId, recordId: user.id, fileName: user.avatar })}></Avatar> : <Avatar></Avatar>}
        </ListItemAvatar>
        <FormControl fullWidth>
          <Input
            placeholder='Add a commment'
            value={comment}
            onFocus={() => {
              setCommentsEnabled(true)
            }}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormControl>
      </ListItem>
      <Grid
        container
        display='flex'
        justifyContent='end'
        spacing={1}
      >
        {commentsEnabled ? (
          <Grid
            sx={{ marginTop: 1 }}
            item
          >
            <PillButton
              onClick={() => {
                setCommentsEnabled(false)
              }}
              sx={{ marginRight: 1 }}
              variant='text'
            >
              Cancel
            </PillButton>
            <PillButton
              disabled={comment.length < 1}
              onClick={() => {}}
              color='primary'
            >
              Comment
            </PillButton>
          </Grid>
        ) : null}
      </Grid>
      <List>
        <ListItem
          disablePadding
          sx={{ paddingY: 2 }}
        >
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary='User'
            secondary={
              <Box>
                <Typography>This is a simple comment</Typography>
                <Box>
                  <Box
                    display='inline'
                    marginRight={1}
                  >
                    <IconButton
                      size='small'
                      sx={{ marginRight: "2px" }}
                    >
                      <ThumbUpAltOutlined fontSize='small'></ThumbUpAltOutlined>
                    </IconButton>
                    200
                  </Box>
                  <IconButton size='small'>
                    <ThumbDownAltOutlined fontSize='small'></ThumbDownAltOutlined>
                  </IconButton>
                </Box>
              </Box>
            }
          ></ListItemText>
        </ListItem>
      </List>
    </Box>
  )
}
