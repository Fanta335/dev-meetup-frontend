import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useCallback, useState, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { messageActions } from "../messageSlice";
import { selectCurrentRoom } from "../../room/roomSlice";
import { ConfirmDeletionDialog } from "./ConfirmDeletionDialog";

type Props = {
  messageId: number;
};

export const DeleteMessageButton: VFC<Props> = memo(({ messageId }) => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const [open, setOpen] = useState(false);

  const handleDelete = useCallback(() => {
    dispatch(messageActions.removeMessage({ roomId: currentRoom.id.toString(), messageId: messageId }));
    // console.log("remove message id: ", messageId);
    setOpen(false);
  }, [dispatch, currentRoom, messageId]);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

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
});
