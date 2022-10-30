import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Elements/Navbar/Navbar";
import Sidebar from "../Elements/Sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "auto" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
