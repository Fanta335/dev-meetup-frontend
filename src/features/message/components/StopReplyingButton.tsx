import { IconButton, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../stores/hooks';
import { messageActions } from '../messageSlice';

export const StopReplyingButton = () => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(messageActions.endReplying());
  }, [dispatch]);
  return (
    <Tooltip title="返信をやめる" placement="top" arrow>
      <IconButton onClick={handleClick} color="secondary">
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};
