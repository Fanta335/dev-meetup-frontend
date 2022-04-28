import { IconButton, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { VFC } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";

type Props = {
  messageId: number;
}

export const ReplyButton:VFC<Props> = ({messageId}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(messageActions.startReplying({parentMessageId: messageId}));
  }

  return (
    <Tooltip title="返信する" placement="top" arrow>
      <IconButton onClick={handleClick}>
        <ReplyIcon />
      </IconButton>
    </Tooltip>
  );
};
