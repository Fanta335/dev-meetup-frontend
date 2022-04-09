import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { VFC } from "react";

type Props = {
  name: string;
};

export const UserItem: VFC<Props> = ({ name }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="" />
      </ListItemAvatar>
      <ListItemText primary={name} />
    </ListItem>
  );
};
