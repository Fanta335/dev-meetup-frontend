import { IconButton } from "@mui/material";
import { useState } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { CreateRoomDialog } from "./CreateRoomDialog";

export const CreateRoomButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="create room" onClick={handleClickOpen}>
        <AddCircleOutlinedIcon />
      </IconButton>
      <CreateRoomDialog open={open} handleClose={handleClose} />
    </div>
  );
};
