import { Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { EditUserAvatarDialog } from './EditUserAvatarDialog';

export const EditUserAvatarButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button onClick={handleClickOpen} variant="contained" color="primary">
        アバターの変更
      </Button>
      <EditUserAvatarDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
