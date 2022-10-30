import { Button } from '@mui/material';
import { useCallback, useState } from 'react';
import { EditUserEmailDialog } from './EditUserEmailDialog';

export const EditUserEmailButton = () => {
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
        編集
      </Button>
      <EditUserEmailDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
