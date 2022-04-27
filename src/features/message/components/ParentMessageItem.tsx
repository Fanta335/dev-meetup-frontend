import { Avatar, Box, Typography } from "@mui/material";
import { VFC } from "react";
import { Message } from "../types";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../../user/userSlice";

type Props = {
  parentMessage: Message;
};

export const ParentMessageItem: VFC<Props> = ({ parentMessage }) => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  const authorId = parentMessage?.authorId;
  const author = currentUsers.members.byIds[authorId];
  return (
    <Box sx={{ display: "flex", alignItems: 'center' }}>
      <Box>
        <Avatar alt={author.name} sx={{ mr: 1, width: 24, height: 24 }} />
      </Box>
      <Box>
        <Typography variant="body2">{author.name}</Typography>
      </Box>
      <Box sx={{pl: 1}}>
        <Typography variant="caption">{parentMessage.content}</Typography>
      </Box>
    </Box>
  );
};
