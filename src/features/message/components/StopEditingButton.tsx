import { IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";
import { memo } from "react";

export const StopEditingButton = memo(() => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(messageActions.endEdit());
    console.log("end edit the message");
  };
  return (
    <Tooltip title="編集をやめる" placement="top" arrow>
      <IconButton onClick={handleClick} color="secondary">
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
});
