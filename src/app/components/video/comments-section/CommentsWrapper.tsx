import { Box, List } from "@mui/material"
import Comment from "./Comment"
import { faker } from "@faker-js/faker"
import SubmitComment from "./SubmitComment"

export default function Comments() {
  const comments = Array.from({ length: 20 }).map((item, index) => {
    return { username: faker.person.firstName(), message: faker.lorem.sentences({ min: 1, max: 6 }), likes: faker.number.int({ min: 0, max: 500 }) }
  })
  return (
    <Box>
      <SubmitComment></SubmitComment>
      <List>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
          ></Comment>
        ))}
      </List>
    </Box>
  )
}
