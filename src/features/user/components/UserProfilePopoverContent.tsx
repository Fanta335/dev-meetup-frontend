import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { VFC } from "react";
import { useAppSelector } from "../../../stores/hooks";
import { selectCurrentRoom } from "../../room/roomSlice";
import { User } from "../types";

type Props = {
  user: User;
};

export const UserProfilePopoverContent: VFC<Props> = ({ user }) => {
  const currentRoom = useAppSelector(selectCurrentRoom);
  const isOwner = currentRoom.entity.owners.includes(user.id);

  return (
    <>
      <Grid container direction="column" p={2}>
        <Avatar src={user.avatar.url} sx={{ width: 100, height: 100, mb: 2 }} />
        {isOwner && <Typography>ownerdesu</Typography>}
        <Typography variant="h5" fontWeight="bold">
          {user.name}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {user.description.length > 0 && (
          <Typography variant="body2" fontWeight="bold" color="text.secondary" mb={2}>
            自己紹介
          </Typography>
        )}
        <Typography>{user.description}</Typography>
      </Grid>
    </>
  );
};
