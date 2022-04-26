import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";
import { selectCurrentRoom } from "../../room/roomSlice";
import { ConfirmDeletionDialog } from "./ConfirmDeletionDialog";

type Props = {
  messageId: number;
};

export const DeleteMessageButton: VFC<Props> = ({ messageId }) => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    dispatch(messageActions.removeMessage({ roomId: currentRoom.id.toString(), messageId: messageId }));
    console.log("remove message id: ", messageId);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="削除する" placement="top" arrow>
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <ConfirmDeletionDialog open={open} handleClose={handleClose} handleDelelte={handleDelete} />
    </>
  );
};
