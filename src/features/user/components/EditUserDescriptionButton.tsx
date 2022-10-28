import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { EditUserDescriptionDialog } from "./EditUserDescriptionDialog";

export const EditUserDescriptionButton = () => {
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
      <EditUserDescriptionDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
