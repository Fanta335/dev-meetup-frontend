import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";
import { FC, memo, useCallback } from "react";

type Props = {
  messageId: number;
};

export const EditMessageButton: FC<Props> = memo(({ messageId }) => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(messageActions.startEdit({ messageId }));
  }, [dispatch, messageId]);
  return (
    <Tooltip title="編集する" placement="top" arrow>
      <IconButton onClick={handleClick} color="secondary">
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
});
