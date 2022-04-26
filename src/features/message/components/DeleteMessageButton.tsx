import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";
import { selectCurrentRoom } from "../../room/roomSlice";

type Props = {
  messageId: number;
};

export const DeleteMessageButton: VFC<Props> = ({ messageId }) => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const handleClick = () => {
    dispatch(messageActions.removeMessage({ roomId: currentRoom.id.toString(), messageId: messageId }));
    console.log("remove message id: ", messageId);
  };
  return (
    <Tooltip title="削除する" placement="top" arrow>
      <IconButton onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};
