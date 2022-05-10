import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../../stores/hooks";
import { changeLocation, searchAsyncRooms } from "../roomSlice";
import { SearchHeader } from "./SearchHeader";
import { TopRoomList } from "./TopRoomList";

export const RoomDiscovery = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  dispatch(changeLocation("discovery"));

  const testSearchParams = 'query=&offset=0&limit=6&sort=date&order=a';

  const searchRooms = async () => {
    const token = await getAccessTokenSilently();

    await dispatch(searchAsyncRooms({ token: token, searchParams: testSearchParams }));
  };

  searchRooms();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", bgcolor: "gray", height: "100%" }}>
        <Box sx={{ bgcolor: "pink", display: "flex", justifyContent: "center" }}>
          <SearchHeader />
        </Box>
        <Box sx={{ flexGrow: 1, bgcolor: "navy" }}>
          <TopRoomList />
        </Box>
      </Box>
    </>
  );
};
