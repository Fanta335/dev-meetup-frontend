import { useAuth0 } from "@auth0/auth0-react";
import { List, ListItem, Tooltip, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAsyncGetBelongingRooms, selectBelongingRooms } from "../roomSlice";
import HouseIcon from "@mui/icons-material/House";
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
      <List>
        {belongingRooms.allIds.map((roomId) => (
          <ListItem button key={roomId} sx={{ display: "flex", justifyContent: "center", height: "60px" }}>
            <Tooltip title={belongingRooms.byIds[roomId].name} placement="right" arrow TransitionComponent={Zoom}>
              <Link to={`rooms/${roomId}`}>
                <HouseIcon sx={{ color: "inherit", fontSize: "48px" }} />
              </Link>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );
};
