import { AppBar, Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { RoomSettingsMenu } from "../../features/room/components/RoomSettingsMenu";
import { selectCurrentRoomLoading, selectLocation } from "../../features/room/roomSlice";
import { ShowRoomMemberDrawerButton } from "../../features/user/components/ShowRoomMemberDrawerButton";
import { UserSettingsButton } from "../../features/user/components/UserSettingsButton";
import { useAppSelector } from "../../stores/hooks";
import LogoutButton from "../auth/LogoutButton";
import { LocationName } from "./LocationName";

export const Navbar = () => {
  const location = useAppSelector(selectLocation);
  const loading = useAppSelector(selectCurrentRoomLoading);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = ["Profile", "Account", "Logout"];

  return (
    <AppBar position="fixed" sx={{ mr: "12px", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, pl: "62px", display: "flex", alignItems: "center" }}>
          <LocationName location={location} />
          {location === "room" && loading === "idle" && <RoomSettingsMenu />}
        </Box>
        <LogoutButton />
        <ShowRoomMemberDrawerButton />
        <Box sx={{ flexGrow: 0 }}>
          <UserSettingsButton
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
            settings={settings}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
