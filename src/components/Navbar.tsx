import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { VFC } from "react";
import { NavLink } from "react-router-dom";
import AuthenticationButton from "./AuthenticationButton";
import SignupButton from "./SignupButton";

const NavBar: VFC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <NavLink to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>
          </NavLink>
          <AuthenticationButton />
          <SignupButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
