import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { VFC } from "react";
import { User } from "../types";

type Props = {
  user: User;
};

export const UserItem: VFC<Props> = ({ user }) => {
  return (
    <ListItem sx={{ pl: 0 }}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={user.avatar ? user.avatar.url : ""} />
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItem>
  );
};
