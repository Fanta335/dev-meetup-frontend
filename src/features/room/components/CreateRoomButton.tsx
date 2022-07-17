import { IconButton, ListItem, Tooltip, Zoom } from "@mui/material";
import { useState } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { CreateRoomDialog } from "./CreateRoomDialog";
import { useAppDispatch } from "../../../stores/hooks";
import { roomActions } from "../roomSlice";

export const CreateRoomButton = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(undefined);
    dispatch(roomActions.setRoomAvatarPreview({ url: null }));
    setOpen(false);
  };

  return (
    <Tooltip title="create room" placement="right" arrow TransitionComponent={Zoom}>
      <ListItem button sx={{ display: "flex", justifyContent: "center", height: "50px" }}>
        <IconButton aria-label="create room" onClick={handleClickOpen} color="success">
          <AddCircleOutlinedIcon sx={{ fontSize: "54px" }} />
        </IconButton>
        <CreateRoomDialog open={open} handleClose={handleClose} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      </ListItem>
    </Tooltip>
  );
};
