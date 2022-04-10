import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

export const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Navbar />
        <Box sx={{ bgcolor: "green", mt: 8, height: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
