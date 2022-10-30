import { Button } from '@mui/material';
import { useState } from 'react';
import { EditUserNameDialog } from './EditUserNameDialog';

export const EditUserNameButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant="contained" color="primary">
        編集
      </Button>
      <EditUserNameDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
