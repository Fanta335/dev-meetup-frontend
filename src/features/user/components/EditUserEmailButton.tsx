import { Button } from "@mui/material";
import { useState } from "react";
import { EditUserEmailDialog } from "./EditUserEmailDialog";

export const EditUserEmailButton = () => {
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
      <EditUserEmailDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
