import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { selectCurrentRoom, selectLocation } from "../../features/room/roomSlice";
import { useAppSelector } from "../../stores/hooks";
import LogoutButton from "../auth/LogoutButton";

export const Navbar = () => {
  const location = useAppSelector(selectLocation);
  const currentRoom = useAppSelector(selectCurrentRoom);
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
        <Box sx={{ flexGrow: 1, pl: "50px" }}>
          {location === "room" && (
            <Typography variant="h6" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
              {currentRoom.name}
            </Typography>
          )}
          {location === "home" && (
            <Typography variant="h6" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
              ホーム
            </Typography>
          )}
          {location === "discovery" && (
            <Typography variant="h6" noWrap sx={{ textDecoration: "none", color: "inherit" }}>
              探す
            </Typography>
          )}
        </Box>
        <LogoutButton />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Usericon" />
            </IconButton>
          </Tooltip>
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
