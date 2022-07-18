import { Button } from "@mui/material";
import { useState } from "react";
import { EditUserAvatarDialog } from "./EditUserAvatarDialog";

export const EditUserAvatarButton = () => {
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
        アバターの変更
      </Button>
      <EditUserAvatarDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
