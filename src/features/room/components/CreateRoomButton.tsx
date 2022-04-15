import { IconButton, List, ListItem, Tooltip, Zoom } from "@mui/material";
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
    <List>
      <Tooltip title="create room" placement="right" arrow TransitionComponent={Zoom}>
        <ListItem button sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton aria-label="create room" onClick={handleClickOpen}>
            <AddCircleOutlinedIcon />
          </IconButton>
          <CreateRoomDialog open={open} handleClose={handleClose} />
        </ListItem>
      </Tooltip>
    </List>
  );
};
