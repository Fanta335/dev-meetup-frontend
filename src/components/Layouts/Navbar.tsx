import { AppBar, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  const drawerWidth = 70;
  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dev Meetup
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
