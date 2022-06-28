import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, VFC } from "react";
import { Loading } from "./Loading";
import { fetchUserProfile, selectCurrentUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { Avatar, Button } from "@mui/material";

export const Profile: VFC = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchUserProfile({ token }));
    };

    getUserProfile();
  }, [getAccessTokenSilently, dispatch]);
  console.log("current user: ", currentUser);

  if (isLoading) {
    return <Loading />;
  }

  console.log("this is profile.");

  return isAuthenticated ? (
    <>
      <Avatar src={currentUser.avatar.url} sx={{ width: "100px", height: "100px" }} />
      <p>id: {currentUser.id}</p>
      <p>name: {currentUser.name}</p>
      <Button variant="contained">プロフィールを編集</Button>
    </>
  ) : (
    <h2>Not authenticated!</h2>
  );
};
