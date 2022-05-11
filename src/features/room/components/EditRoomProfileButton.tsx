import { MenuItem } from "@mui/material";
import { useState, VFC } from "react";
import { EditRoomProfileDialog } from "./EditRoomProfileDialog";

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
      <MenuItem onClick={handleClickOpen}>部屋の設定</MenuItem>
      <EditRoomProfileDialog open={open} handleCloseDialog={handleCloseDialog} handleEdit={handleEdit} />
    </>
  );
};
