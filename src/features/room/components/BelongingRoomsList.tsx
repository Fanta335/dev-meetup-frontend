import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, List, ListItem, Tooltip, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAsyncGetBelongingRooms, selectBelongingRooms } from "../roomSlice";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

export const BelongingRoomsList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const belongingRooms = useAppSelector(selectBelongingRooms);

  useEffect(() => {
    const fetchBelongingRooms = async () => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchAsyncGetBelongingRooms({ token }));
    };
    fetchBelongingRooms();
  }, [dispatch, getAccessTokenSilently]);

  console.log("belonging rooms: ", belongingRooms);

  return (
    <>
      <List sx={{p: 0}}>
        {belongingRooms.allIds.map((roomId) => (
          <Tooltip title={belongingRooms.byIds[roomId].name} placement="right" arrow TransitionComponent={Zoom}>
            <ListItem button key={roomId} sx={{ display: "flex", justifyContent: "center", height: "50px" }}>
              <IconButton aria-label={belongingRooms.byIds[roomId].name} component={Link} to={`rooms/${roomId}`}>
                <PeopleIcon sx={{ fontSize: "48px" }} />
              </IconButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </>
  );
};
