import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, IconButton, List, ListItem, Tooltip, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchBelongingRooms, fetchOwnRooms, selectBelongingRooms } from "../roomSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { Auth0User } from "../../auth/types";
import { getCurrentUser } from "../../user/utils/getCurrentUser";

export const BelongingRoomIconsList = () => {
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const dispatch = useAppDispatch();
  const belongingRooms = useAppSelector(selectBelongingRooms);
  const currentUser = getCurrentUser(user);

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
            <ListItem button sx={{ display: "flex", justifyContent: "center", height: "50px" }}>
              <IconButton aria-label={belongingRooms.byIds[roomId].name} component={Link} to={`rooms/${roomId}`}>
                {belongingRooms.byIds[roomId].avatar ? (
                  <Avatar src={belongingRooms.byIds[roomId].avatar.url} sx={{ height: "45px", width: "45px" }} />
                ) : (
                  <AccountCircleIcon sx={{ fontSize: "54px" }} color="secondary" />
                )}
              </IconButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </>
  );
};
