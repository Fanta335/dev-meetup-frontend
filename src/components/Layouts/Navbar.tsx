import { AppBar, Box, Toolbar } from "@mui/material";
import { useState } from "react";
import { RoomSettingsMenu } from "../../features/room/components/RoomSettingsMenu";
import { selectLocation } from "../../features/room/roomSlice";
import { UserSettingsButton } from "../../features/user/components/UserSettingsButton";
import { useAppSelector } from "../../stores/hooks";
import LogoutButton from "../auth/LogoutButton";
import { LocationName } from "./LocationName";

export const Navbar = () => {
  const location = useAppSelector(selectLocation);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = ["Profile", "Account", "Logout"];

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, pl: "50px", display: "flex", alignItems: "center" }}>
          <LocationName location={location} />
          {location === "room" && <RoomSettingsMenu />}
        </Box>
        <LogoutButton />
        <Box sx={{ flexGrow: 0 }}>
          <UserSettingsButton handleOpenUserMenu={handleOpenUserMenu} handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} settings={settings} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
