import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, IconButton, Menu } from "@mui/material";
import { useEffect, VFC } from "react";
import LogoutButton from "../../../components/auth/LogoutButton";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchUserProfile, selectCurrentUser } from "../userSlice";
import { ProfileButton } from "./ProfileButton";

type Props = {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  anchorElUser: HTMLElement | null;
};

export const ProfileIcon: VFC<Props> = ({ handleOpenUserMenu, handleCloseUserMenu, anchorElUser }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchUserProfile({ token }));
    };

    getUserProfile();
    console.log("profile icon.");
  }, [getAccessTokenSilently, dispatch]);

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar src={currentUser.avatar ? currentUser.avatar.url : user?.picture} />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <ProfileButton handleClose={handleCloseUserMenu} />
        <LogoutButton handleClose={handleCloseUserMenu} />
      </Menu>
    </>
  );
};
