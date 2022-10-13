import { Divider, Drawer, Toolbar } from "@mui/material";
import { BelongingRoomIconsList } from "../../features/room/components/BelongingRoomIconsList";
import { CreateRoomButton } from "../../features/room/components/CreateRoomButton";
import { DiscoverRoomButton } from "../../features/room/components/DiscoverRoomButton";

const Sidebar = () => {
  const drawerWidth = 75;
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
      <Toolbar sx={{mb: 1}} />
      <DiscoverRoomButton />
      <Divider sx={{ my: 1 }} />
      <BelongingRoomIconsList />
      <Divider sx={{ my: 1 }} />
      <CreateRoomButton />
    </Drawer>
  );
};

export default Sidebar;
