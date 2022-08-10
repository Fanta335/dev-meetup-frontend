import { useAuth0 } from "@auth0/auth0-react";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { roomActions, searchAsyncRooms } from "../roomSlice";
import { SearchHeader } from "./SearchHeader";
import { TopRoomList } from "./TopRoomList";

export const RoomDiscovery = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(roomActions.changeLocation("discovery"));
  }, [dispatch]);

  const testSearchParams = "query=&offset=0&limit=6&sort=date&order=d";

  const searchRooms = async () => {
    const token = await getAccessTokenSilently();

    await dispatch(searchAsyncRooms({ token: token, searchParams: testSearchParams }));
  };

  searchRooms();

  return (
    <>
      <Grid container height="100%">
        <Grid container item direction="column" pt={8}>
          <Grid container item justifyContent="center">
            <SearchHeader />
          </Grid>
          <Grid container item>
            <TopRoomList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
