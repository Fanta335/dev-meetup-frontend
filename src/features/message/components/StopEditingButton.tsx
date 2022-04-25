import { IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";

export const StopEditingButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(messageActions.endEdit());
    console.log("end edit the message");
  };
  return (
    <Tooltip title="編集をやめる" placement="top" arrow>
      <IconButton onClick={handleClick}>
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};
