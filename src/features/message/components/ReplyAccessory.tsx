import { useEffect, VFC } from "react";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchOneMessage, selectCurrentMessages } from "../messageSlice";
import { Message } from "../types";
import { Box } from "@mui/material";
import { ParentMessageItem } from "./ParentMessageItem";
import { DeletedParentMessageItem } from "./DeletedParentMessageItem";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  parentMessageId: number;
  handleClickReply: (messageId: number) => void;
};

export const ReplyAccessory: VFC<Props> = ({ parentMessageId, handleClickReply }) => {
  const currentMessages = useAppSelector(selectCurrentMessages);
  const parentMessage: Message | undefined = currentMessages.byIds[parentMessageId];
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchParentMessage = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchOneMessage({ token, messageId: parentMessageId }));
    };
    fetchParentMessage();
  }, [dispatch, getAccessTokenSilently, parentMessageId]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
      <ShortcutIcon sx={{ fontSize: "36px", color: "#888" }} />
      {parentMessage ? <ParentMessageItem parentMessage={parentMessage} handleClickReply={handleClickReply} /> : <DeletedParentMessageItem />}
    </Box>
  );
};
