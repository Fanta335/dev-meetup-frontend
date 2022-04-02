import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export const MainLayout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Sidebar />;
      <Box marginLeft={12}>
        <Outlet />
      </Box>
    </Box>
  );
};
