import { useAuth0 } from "@auth0/auth0-react";
import { List, ListItem, Tooltip, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAsyncGetOwnRooms, selectOwnRooms } from "../roomSlice";
import HouseIcon from "@mui/icons-material/House";
import { Link } from "react-router-dom";

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
          <ListItem button key={roomId} sx={{ display: "flex", justifyContent: "center", height: "60px" }}>
            <Tooltip title={ownRooms.byIds[roomId].name} placement="right" arrow TransitionComponent={Zoom}>
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
