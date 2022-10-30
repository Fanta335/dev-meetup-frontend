import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, memo, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { messageActions } from '../messageSlice';
import { selectCurrentRoom } from '../../room/roomSlice';
import { ConfirmDeletionDialog } from './ConfirmDeletionDialog';

type Props = {
  messageId: number;
};

export const DeleteMessageButton: FC<Props> = memo(({ messageId }: Props) => {
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);
  const [open, setOpen] = useState(false);

  const handleDelete = useCallback(() => {
    dispatch(
      messageActions.removeMessage({
        roomId: currentRoom.entity.id.toString(),
        messageId,
      })
    );
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
        <IconButton onClick={handleClickOpen} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <ConfirmDeletionDialog open={open} handleClose={handleClose} handleDelelte={handleDelete} />
    </>
  );
});

DeleteMessageButton.displayName = 'DeleteMessageButton';
