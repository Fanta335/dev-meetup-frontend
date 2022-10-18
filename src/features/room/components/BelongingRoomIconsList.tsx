import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, IconButton, List, ListItem, Tooltip, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchBelongingRooms, fetchOwnRooms, selectBelongingRooms, selectCurrentRoom, selectLocation } from "../roomSlice";
import { Link } from "react-router-dom";
import { Auth0User } from "../../auth/types";
import { getCurrentUser } from "../../user/utils/getCurrentUser";
import ChairIcon from "@mui/icons-material/Chair";

export const BelongingRoomIconsList = () => {
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const dispatch = useAppDispatch();
  const belongingRooms = useAppSelector(selectBelongingRooms);
  const currentUser = getCurrentUser(user);
  const currentRoom = useAppSelector(selectCurrentRoom);
  const location = useAppSelector(selectLocation);

  useEffect(() => {
    const fetchMyRooms = async () => {
      if (!currentUser) return;

      const token = await getAccessTokenSilently();
      await dispatch(fetchBelongingRooms({ token }));
      await dispatch(fetchOwnRooms({ token, userId: currentUser.id.toString() }));
    };
    fetchMyRooms();
  }, [dispatch, getAccessTokenSilently, currentUser]);

  return (
    <>
      <List sx={{ p: 0 }}>
        {belongingRooms.allIds.map((roomId) => (
          <Tooltip
            key={roomId}
            title={
              <Typography fontFamily="inherit" fontWeight="bold">
                {belongingRooms.byIds[roomId].name}
              </Typography>
            }
            placement="right"
            arrow
            TransitionComponent={Zoom}
          >
            <ListItem button sx={{ display: "flex", justifyContent: "center", height: "60px" }}>
              <IconButton
                aria-label={belongingRooms.byIds[roomId].name}
                component={Link}
                to={`rooms/${roomId}`}
                sx={location === "room" && roomId === currentRoom.entity.id ? { bgcolor: "#772CE8", height: "55px", width: "55px" } : {}}
              >
                {belongingRooms.byIds[roomId].avatar ? (
                  <Avatar src={belongingRooms.byIds[roomId].avatar?.url} sx={{ height: "45px", width: "45px" }} />
                ) : (
                  <Avatar sx={{ height: "45px", width: "45px" }}>
                    <ChairIcon />
                  </Avatar>
                )}
              </IconButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </>
  );
};
