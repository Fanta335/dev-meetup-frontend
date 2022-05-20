import { Avatar, Box, Typography } from "@mui/material";
import { memo, VFC } from "react";
import dayjs from "dayjs";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../../user/userSlice";
import { selectMessageById } from "../messageSlice";
import { MessageMenu } from "./MessageMenu";
import { MessageContent } from "./MessageContent";
import { ReplyAccessory } from "./ReplyAccessory";
import { User } from "../../user/types";

type Props = {
  messageId: number;
};

export const MessageItem: VFC<Props> = memo(({ messageId }) => {
  const currentUsers = useAppSelector(selectCurrentUsers);

  const message = useAppSelector((state) => selectMessageById(state, messageId));
  const parentMessageId = message.parentId;
  const authorId = message.authorId;
  const author = currentUsers.members.byIds[authorId.toString()] as User | undefined;
  const formattedDate = dayjs(message.createdAt).format("YYYY/MM/DD HH:mm");

  return (
    <>
      {/* If this message is a reply, append reply accessory. */}
      <Box>{parentMessageId && <ReplyAccessory parentMessageId={parentMessageId} />}</Box>
      <Box component="div" sx={[{ display: "flex", pb: 3, px: 1, bgcolor: "#ffa" }, { "&:hover": { bgcolor: "#eee" } }]}>
        <Box>
          <Avatar alt={author ? author.name : "removed-user"} sx={{ mr: 1 }} src={author?.avatar ? author.avatar.url : ""} />
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: 1 }}>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            {author ? (
              <Typography variant="body1">{author.name}</Typography>
            ) : (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                脱退したユーザー
              </Typography>
            )}
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
    </>
  );
});
