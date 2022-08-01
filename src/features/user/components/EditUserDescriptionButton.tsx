import { Button } from "@mui/material";
import { useState } from "react";
import { EditUserDescriptionDialog } from "./EditUserDescriptionDialog";

export const EditUserDescriptionButton = () => {
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
      <EditUserDescriptionDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
