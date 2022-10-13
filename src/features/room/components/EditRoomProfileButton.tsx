import { MenuItem, Typography } from "@mui/material";
import { useState, VFC } from "react";
import { EditRoomProfileDialog } from "./EditRoomProfileDialog";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
  handleCloseMenu: () => void;
};

export const EditRoomProfileButton: VFC<Props> = ({ handleCloseMenu }) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    console.log("handle edit.");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    handleCloseMenu();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <SettingsIcon sx={{ mr: 1 }} /> <Typography fontFamily="">部屋の設定</Typography>
      </MenuItem>
      <EditRoomProfileDialog open={open} handleCloseDialog={handleCloseDialog} handleEdit={handleEdit} />
    </>
  );
};
