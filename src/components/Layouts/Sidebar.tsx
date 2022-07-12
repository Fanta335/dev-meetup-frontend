import { Divider, Drawer, Toolbar } from "@mui/material";
import { VFC } from "react";
import { HomeButton } from "../../features/misc/components/HomeButton";
import { BelongingRoomIconsList } from "../../features/room/components/BelongingRoomIconsList";
import { CreateRoomButton } from "../../features/room/components/CreateRoomButton";
import { DiscoverRoomButton } from "../../features/room/components/DiscoverRoomButton";

const Sidebar: VFC = () => {
  const drawerWidth = 70;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        justifyContent: "center",
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <HomeButton />
      <Divider sx={{ my: 1 }} />
      <BelongingRoomIconsList />
      <Divider sx={{ my: 1 }} />
      <CreateRoomButton />
      <DiscoverRoomButton />
    </Drawer>
  );
};

export default Sidebar;
