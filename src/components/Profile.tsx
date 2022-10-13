import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, VFC } from "react";
import { Loading } from "./Loading";
import { fetchUserProfile, selectCurrentUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { Avatar, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import { EditUserAvatarButton } from "../features/user/components/EditUserAvatarButton";
import { EditUserNameButton } from "../features/user/components/EditUserNameButton";
import { EditUserEmailButton } from "../features/user/components/EditUserEmailButton";
import { EditUserPasswordButton } from "../features/user/components/EditUserPasswordButton";
import { EditUserDescriptionButton } from "../features/user/components/EditUserDescriptionButton";
import { DeleteUserButton } from "../features/user/components/DeleteUserButton";

export const Profile: VFC = () => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchUserProfile({ token }));
    };

    getUserProfile();
  }, [getAccessTokenSilently, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Grid container bgcolor="#b5b4b4" direction="column" p={5} maxWidth="600px">
        <Typography variant="subtitle1" fontWeight="bold">
          アバター
        </Typography>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Avatar src={currentUser.avatar.url} sx={{ width: "100px", height: "100px" }} />
          <Grid item>
            <EditUserAvatarButton />
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between" py={1}>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">
              ユーザー名
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {currentUser.name}
            </Typography>
          </Grid>
          <Grid item>
            <EditUserNameButton />
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between" py={1}>
          <Grid item>
            <Typography variant="subtitle1" fontWeight="bold">
              メールアドレス
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {currentUser.email}
            </Typography>
          </Grid>
          <Grid item>
            <EditUserEmailButton />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" fontWeight="bold">
            自己紹介
          </Typography>
          <Card variant="outlined" sx={{ maxWidth: "600px" }}>
            <CardContent>
              <Typography variant="body1">{currentUser.description}</Typography>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="end">
                <EditUserDescriptionButton />
              </Grid>
            </CardActions>
          </Card>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid item>
          <Typography variant="subtitle1" fontWeight="bold">
            パスワード
          </Typography>
          <EditUserPasswordButton />
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid item>
          <Typography variant="subtitle1" fontWeight="bold">
            アカウントの削除
          </Typography>
          <DeleteUserButton />
        </Grid>
      </Grid>
    </>
  );
};
