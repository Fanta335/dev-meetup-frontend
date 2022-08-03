import { Avatar, Box, Typography } from "@mui/material";
import { VFC } from "react";
import { Message } from "../types";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../../user/userSlice";
import { User } from "../../user/types";

type Props = {
  parentMessage: Message;
};

export const ParentMessageItem: VFC<Props> = ({ parentMessage }) => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  const authorId = parentMessage?.authorId;
  const author = currentUsers.members.byIds[authorId] as User | undefined;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box>
        <Avatar alt={author ? author.name : "removed user"} src={author ? author.avatar.url : ""} sx={{ mr: 1, width: 24, height: 24 }} />
      </Box>
      <Box>
        {author ? (
          <Typography variant="body2">{author.name}</Typography>
        ) : (
          <Typography variant="caption" sx={{ fontStyle: "italic" }}>
            脱退したユーザー
          </Typography>
        )}
      </Box>
      <Box sx={{ pl: 1 }}>
        <Typography variant="caption">{parentMessage.content}</Typography>
      </Box>
    </Box>
  );
};
