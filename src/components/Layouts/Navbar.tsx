import { AppBar, Box, Toolbar } from "@mui/material";
import { RoomSettingsMenu } from "../../features/room/components/RoomSettingsMenu";
import { selectCurrentRoomLoading, selectLocation } from "../../features/room/roomSlice";
import { ToggleRoomMemberDrawerButton } from "../../features/user/components/ToggleRoomMemberDrawerButton";
import { useAppSelector } from "../../stores/hooks";
import LogoutButton from "../auth/LogoutButton";
import { LocationName } from "./LocationName";

export const Navbar = () => {
  const location = useAppSelector(selectLocation);
  const loading = useAppSelector(selectCurrentRoomLoading);

  return (
    <AppBar position="fixed" sx={{ mr: "12px", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, pl: "62px", display: "flex", alignItems: "center" }}>
          <LocationName location={location} />
          {location === "room" && loading === "idle" && <RoomSettingsMenu />}
        </Box>
        <LogoutButton />
        {location === "room" && loading === "idle" && <ToggleRoomMemberDrawerButton />}
      </Toolbar>
    </AppBar>
  );
};
