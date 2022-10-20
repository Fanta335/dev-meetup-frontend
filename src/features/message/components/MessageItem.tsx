import { Avatar, Box, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { selectCurrentUsers } from "../../user/userSlice";
import { messageActions, selectMessageById, selectMessageReply } from "../messageSlice";
import { MessageMenu } from "./MessageMenu";
import { MessageContent } from "./MessageContent";
import { ReplyAccessory } from "./ReplyAccessory";
import { User } from "../../user/types";

type Props = {
  messageId: number;
  virtualListId: number;
  handleClickReply: (messageId: number) => void;
};

export const MessageItem: FC<Props> = memo(({ messageId, virtualListId, handleClickReply }) => {
  const [display, setDisplay] = useState(false);

  const currentUsers = useAppSelector(selectCurrentUsers);

  const message = useAppSelector((state) => selectMessageById(state, messageId));
  const parentMessageId = message?.parentId;
  const author = currentUsers.members.byIds[message?.authorId.toString()] as User | undefined;

  const messageReply = useAppSelector(selectMessageReply);
  const isReplyingToThisMessage = messageId === messageReply.parentMessageId;

  const formattedDate = dayjs(message?.createdAt).format("YYYY/MM/DD HH:mm");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messageActions.setVirtualListId({ messageId, virtualListId }));
  }, [dispatch, messageId, virtualListId]);

  return (
    <>
      <Box sx={[{ px: 1 }, { "&:hover": { bgcolor: "#00000013" } }]}>
        {parentMessageId && <ReplyAccessory parentMessageId={parentMessageId} handleClickReply={handleClickReply} />}
      </Box>
      <Box sx={isReplyingToThisMessage ? { bgcolor: "#1100ff2f", borderLeft: "5px solid #772CE8" } : {}}>
        <Box
          component="div"
          sx={[{ display: "flex", pb: 3, px: 1 }, { "&:hover": { bgcolor: "#00000013" } }]}
          onMouseEnter={() => {
            setDisplay(true);
          }}
          onMouseLeave={() => setDisplay(false)}
        >
          <Box>
            <Avatar alt={author ? author.name : "removed-user"} sx={{ mr: 1, mt: 1 }} src={author ? author.avatar.url : ""} />
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", ml: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", height: "50px" }}>
              <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
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
              </Box>
              <Box>{display && message && <MessageMenu messageId={message.id} />}</Box>
            </Box>
            <Box>{message && <MessageContent message={message} />}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
});
