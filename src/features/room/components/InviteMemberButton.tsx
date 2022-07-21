import { MenuItem } from "@mui/material";
import { useState, VFC } from "react";
import { InviteMemberDialog } from "./InviteMemberDialog";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = {
  handleCloseMenu: () => void;
};

export const InviteMemberButton: VFC<Props> = ({ handleCloseMenu }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    handleCloseMenu();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen} >
        <PersonAddIcon sx={{ mr: 1 }} />
        メンバーを招待
      </MenuItem>
      <InviteMemberDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
