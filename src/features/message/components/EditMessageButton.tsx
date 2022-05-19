import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";
import { memo, useCallback, VFC } from "react";

type Props = {
  messageId: number;
};

export const EditMessageButton: VFC<Props> = memo(({ messageId }) => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(messageActions.startEdit({ messageId }));
    // console.log("start edit the message id: ", messageId);
    // console.log("message edit: ", messageEdit);
  }, [dispatch, messageId]);
  return (
    <Tooltip title="編集する" placement="top" arrow>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
});
