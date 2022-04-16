import { Box } from "@mui/material";
import { SearchCard } from "./SearchCard";
import { TopRoomList } from "./TopRoomList";

export const RoomDiscovery = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "gray", height: "100%" }}>
        <Box sx={{ bgcolor: "pink", display: "flex", justifyContent: "center" }}>
          <SearchCard />
        </Box>
        <Box sx={{ flexGrow: 1, bgcolor: "navy" }}>
          <TopRoomList />
        </Box>
      </Box>
    </>
  );
};
