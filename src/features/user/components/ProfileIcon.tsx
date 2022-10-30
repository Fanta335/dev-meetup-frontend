import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, IconButton, Menu } from "@mui/material";
import { useEffect, FC, memo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import LogoutButton from "../../auth/components/LogoutButton";
import { fetchUserProfile, selectCurrentUser } from "../userSlice";
import { ProfileButton } from "./ProfileButton";

type Props = {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  anchorElUser: HTMLElement | null;
};

export const ProfileIcon: FC<Props> = memo(({ handleOpenUserMenu, handleCloseUserMenu, anchorElUser }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const getUserProfile = useCallback(async () => {
    const token = await getAccessTokenSilently();
    await dispatch(fetchUserProfile({ token }));
  }, [getAccessTokenSilently, dispatch]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar src={currentUser.avatar.url} />
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
});
