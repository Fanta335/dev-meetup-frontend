import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { VFC } from "react";
import { User } from "../types";

type Props = {
  user: User;
};

export const UserProfilePopoverContent: VFC<Props> = ({ user }) => {
  return (
    <>
      <Grid container direction="column" p={2}>
        <Avatar src={user.avatar.url} sx={{ width: 100, height: 100, mb: 2 }} />
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
