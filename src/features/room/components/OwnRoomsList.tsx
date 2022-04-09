import { useAuth0 } from "@auth0/auth0-react";
import { List, ListItem, ListItemIcon, Tooltip, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAsyncGetOwnRooms, selectOwnRooms } from "../roomSlice";
import HouseIcon from '@mui/icons-material/House';

export const OwnRoomsList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const ownRooms = useAppSelector(selectOwnRooms);

  useEffect(() => {
    const fetchOwnRooms = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchAsyncGetOwnRooms({ token }));
    };
    fetchOwnRooms();
  }, [dispatch, getAccessTokenSilently]);

  console.log("own rooms: ", ownRooms);

  return (
    <>
      <List>
        {ownRooms.allIds.map((roomId) => (
          <ListItem button key={roomId}>
            <Tooltip title={ownRooms.byIds[roomId].name} placement="right" arrow TransitionComponent={Zoom}>
              <ListItemIcon><HouseIcon /></ListItemIcon>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );
};
