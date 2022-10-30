import { AppBar, Box, Toolbar } from "@mui/material";
import { useCallback, useState } from "react";
import { RoomSettingsMenu } from "../../room/components/RoomSettingsMenu";
import { selectCurrentRoomLoading, selectLocation } from "../../room/roomSlice";
import { ToggleThemeSwitch } from "../../theme/components/ToggleThemeSwitch";
import { ProfileIcon } from "../../user/components/ProfileIcon";
import { ToggleRoomMemberDrawerButton } from "../../user/components/ToggleRoomMemberDrawerButton";
import { useAppSelector } from "../../../stores/hooks";
import { LocationName } from "./LocationName";

export const Navbar = () => {
  const location = useAppSelector(selectLocation);
  const loading = useAppSelector(selectCurrentRoomLoading);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);
  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "rgba(255, 0, 0, 0)" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, pl: "70px", display: "flex", alignItems: "center" }}>
          <LocationName location={location} />
          {location === "room" && loading === "idle" && <RoomSettingsMenu />}
        </Box>
        {location === "room" && loading === "idle" && <ToggleRoomMemberDrawerButton />}
        <ToggleThemeSwitch />
        <ProfileIcon handleOpenUserMenu={handleOpenUserMenu} handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} />
      </Toolbar>
    </AppBar>
  );
};
