import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddOwnerPopoverContent } from "./AddOwnerPopoverContent";
import { User } from "../types";
import { useState, VFC } from "react";

type Props = {
  user: User;
};

export const AddOwnerPopover: VFC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "add-owner-popover" : undefined;

  return (
    <>
      <Button aria-describedby={id} variant="contained" onClick={handleClick} startIcon={<AddCircleIcon />}>
        オーナーに追加
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <AddOwnerPopoverContent user={user} handleClose={handleClose} />
      </Popover>
    </>
  );
};
