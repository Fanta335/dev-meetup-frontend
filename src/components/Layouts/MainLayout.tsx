import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", pl: 3, pt: 7 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
