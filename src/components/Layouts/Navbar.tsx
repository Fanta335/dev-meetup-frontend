import { AppBar, Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { RoomSettingsMenu } from "../../features/room/components/RoomSettingsMenu";
import { selectCurrentRoomLoading, selectLocation } from "../../features/room/roomSlice";
import { ToggleThemeSwitch } from "../../features/theme/components/ToggleThemeSwitch";
import { ProfileIcon } from "../../features/user/components/ProfileIcon";
import { ToggleRoomMemberDrawerButton } from "../../features/user/components/ToggleRoomMemberDrawerButton";
import { useAppSelector } from "../../stores/hooks";
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

  return (
    <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "rgba(255, 0, 0, 0)" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, pl: "70px", display: "flex", alignItems: "center" }}>
          <LocationName location={location} />
          {location === "room" && loading === "idle" && <RoomSettingsMenu />}
        </Box>
        <ToggleThemeSwitch />
        {location === "room" && loading === "idle" && <ToggleRoomMemberDrawerButton />}
        <ProfileIcon handleOpenUserMenu={handleOpenUserMenu} handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} />
      </Toolbar>
    </AppBar>
  );
};
