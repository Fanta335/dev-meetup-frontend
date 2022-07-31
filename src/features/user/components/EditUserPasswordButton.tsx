import { Button } from "@mui/material";
import { useState } from "react";
import { EditUserPasswordDialog } from "./EditUserPasswordDialog";

export const EditUserPasswordButton = () => {
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
        パスワードを変更する
      </Button>
      <EditUserPasswordDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
