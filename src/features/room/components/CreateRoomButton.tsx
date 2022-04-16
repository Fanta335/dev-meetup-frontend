import { IconButton, ListItem, Tooltip, Zoom } from "@mui/material";
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
    <Tooltip title="create room" placement="right" arrow TransitionComponent={Zoom}>
      <ListItem button sx={{ display: "flex", justifyContent: "center", height: "60px" }}>
        <IconButton aria-label="create room" onClick={handleClickOpen}>
          <AddCircleOutlinedIcon sx={{ fontSize: "48px" }} />
        </IconButton>
        <CreateRoomDialog open={open} handleClose={handleClose} />
      </ListItem>
    </Tooltip>
  );
};
