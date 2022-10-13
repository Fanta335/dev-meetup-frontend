import { MenuItem, Typography } from "@mui/material";
import { FC, useState } from "react";
import { InviteMemberDialog } from "./InviteMemberDialog";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

type Props = {
  handleCloseMenu: () => void;
};

export const InviteMemberButton: FC<Props> = ({ handleCloseMenu }) => {
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
      <MenuItem onClick={handleClickOpen}>
        <PersonAddIcon sx={{ mr: 1 }} />
        <Typography fontFamily="">メンバーを招待</Typography>
      </MenuItem>
      <InviteMemberDialog open={open} handleCloseDialog={handleCloseDialog} />
    </>
  );
};
