import { Divider, Drawer, Toolbar } from "@mui/material";
import { VFC } from "react";
import { OwnRoomsList } from "../../features/room/components/OwnRoomsList";
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
      <Divider />
      <OwnRoomsList />
      <Divider />
      <CreateRoomButton />
      <DiscoverRoomButton />
    </Drawer>
  );
};

export default Sidebar;
