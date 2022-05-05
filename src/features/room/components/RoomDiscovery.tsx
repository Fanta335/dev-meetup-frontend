import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../../stores/hooks";
import { searchAsyncRooms } from "../roomSlice";
import { SearchOptions } from "../types";
import { SearchCard } from "./SearchCard";
import { TopRoomList } from "./TopRoomList";

export const RoomDiscovery = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const testSearchOptions: SearchOptions = {
    query: "",
    offset: 0,
    limit: 6,
    sort: "date",
    order: "d",
  };

  const searchRooms = async () => {
    const token = await getAccessTokenSilently();

    dispatch(searchAsyncRooms({ token: token, searchOptions: testSearchOptions }));
  };

  searchRooms();

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
