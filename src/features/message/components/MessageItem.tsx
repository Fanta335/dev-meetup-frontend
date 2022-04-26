import { Avatar, Box, Typography } from "@mui/material";
import { VFC } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../../user/userSlice";
import { selectCurrentMessages } from "../messageSlice";
import { MessageMenu } from "./MessageMenu";
import { MessageContent } from "./MessageContent";

type Props = {
  messageId: number;
};

export const MessageItem: VFC<Props> = ({ messageId }) => {
  const currentUsers = useAppSelector(selectCurrentUsers);
  const currentMessages = useAppSelector(selectCurrentMessages);

  const authorId = currentMessages.byIds[messageId].authorId;
  const author = currentUsers.members.byIds[authorId.toString()];
  const message = currentMessages.byIds[messageId];

  const formattedDate = dayjs(message.createdAt).format("YYYY/MM/DD HH:mm");

  return (
    <Box component="div" sx={[{ display: "flex", py: 3, px: 1, bgcolor: "#ffa" }, { "&:hover": { bgcolor: "#eee" } }]}>
      <Box>
        <Avatar alt={author.name} sx={{ mr: 1 }} />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: 1 }}>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography variant="body1">{author.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {formattedDate}
          </Typography>
          <MessageMenu messageId={message.id} />
        </Box>
        <Box>
          <MessageContent message={message} />
        </Box>
      </Box>
    </Box>
  );
};
