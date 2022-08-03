import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useState, VFC } from "react";
import { User } from "../types";
import { UserProfilePopover } from "./UserProfilePopover";

type Props = {
  user: User;
};

export const UserItem: VFC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <ListItemButton sx={{ pl: 0 }} onClick={handleClick}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={user.avatar.url} />
        </ListItemAvatar>
        <ListItemText primary={user.name} />
      </ListItemButton>
      <UserProfilePopover user={user} open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};
