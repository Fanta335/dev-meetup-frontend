import { useAuth0 } from '@auth0/auth0-react';
import { Grid } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../stores/hooks';
import { roomActions, searchAsyncRooms } from '../roomSlice';
import { SearchHeader } from './SearchHeader';
import { TopRoomList } from './TopRoomList';

export const RoomDiscovery = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const initialSearchParams = 'query=&offset=0&limit=6&sort=date&order=d&tagId=';

  const searchRooms = useCallback(async () => {
    const token = await getAccessTokenSilently();
    await dispatch(searchAsyncRooms({ token, searchParams: initialSearchParams }));
  }, [dispatch, getAccessTokenSilently]);

  useEffect(() => {
    dispatch(roomActions.changeLocation('discovery'));
    searchRooms();
  }, [dispatch, searchRooms]);

  return (
    <Grid container height="100%">
      <Grid container item direction="column" pt={8}>
        <Grid container item>
          <SearchHeader />
        </Grid>
        <Grid container item>
          <TopRoomList />
        </Grid>
      </Grid>
    </Grid>
  );
};
