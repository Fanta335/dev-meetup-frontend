import { IconButton, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { FC, memo, useCallback } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";

type Props = {
  messageId: number;
};

export const ReplyButton: FC<Props> = memo(({ messageId }) => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(messageActions.startReplying({ parentMessageId: messageId }));
  }, [dispatch, messageId]);

  return (
    <Tooltip title="返信する" placement="top" arrow>
      <IconButton onClick={handleClick} color="secondary">
        <ReplyIcon />
      </IconButton>
    </Tooltip>
  );
});
