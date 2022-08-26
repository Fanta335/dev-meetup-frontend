import { VFC } from "react";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentMessages } from "../messageSlice";
import { Message } from "../types";
import { Box } from "@mui/material";
import { ParentMessageItem } from "./ParentMessageItem";
import { DeletedParentMessageItem } from "./DeletedParentMessageItem";

type Props = {
  parentMessageId: number;
  handleClickReply: (virtualListId: number | undefined) => void;
};

export const ReplyAccessory: VFC<Props> = ({ parentMessageId, handleClickReply }) => {
  const currentMessages = useAppSelector(selectCurrentMessages);
  const parentMessage: Message | undefined = currentMessages.byIds[parentMessageId];

  return (
    <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
      <ShortcutIcon sx={{ fontSize: "36px", color: "#888" }} />
      {parentMessage ? <ParentMessageItem parentMessage={parentMessage} handleClickReply={handleClickReply} /> : <DeletedParentMessageItem />}
    </Box>
  );
};
