import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, memo } from "react";
import { User } from "../types";

type Props = {
  user: User;
};

export const UserProfilePopoverContent: FC<Props> = memo(({ user }) => {
  return (
    <>
      <Stack p={2}>
        <Avatar src={user.avatar.url} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h5" fontWeight="bold">
          {user.name}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" fontWeight="bold" color="text.secondary" mb={2}>
          自己紹介
        </Typography>
        <Grid item sx={{ width: "100%", overflow: "auto" }}>
          <Typography variant="body1" component="pre">
            {user.description}
          </Typography>
        </Grid>
      </Stack>
    </>
  );
});
