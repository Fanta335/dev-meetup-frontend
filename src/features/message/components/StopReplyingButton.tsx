import { IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";

export const StopReplyingButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(messageActions.endReplying());
  };
  return (
    <Tooltip title="返信をやめる" placement="top" arrow>
      <IconButton onClick={handleClick} color="secondary">
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};
