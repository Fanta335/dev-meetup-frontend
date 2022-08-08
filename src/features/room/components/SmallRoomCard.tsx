import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import { VFC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { Auth0User } from "../../auth/types";
import { getCurrentUser } from "../../user/utils/getCurrentUser";
import { addMemberToRoom, fetchBelongingRooms } from "../roomSlice";
import { SearchedRoom } from "../types";

type Props = {
  room: SearchedRoom;
};

export const SmallRoomCard: VFC<Props> = ({ room }) => {
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentUser = getCurrentUser(user);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (!currentUser) return;

    const token = await getAccessTokenSilently();
    await dispatch(addMemberToRoom({ token, roomId: room.id }));
    await dispatch(fetchBelongingRooms({ token }));
  };

  return (
    <Card sx={{ m: 1 }}>
      <CardActionArea onClick={handleClick} component={Link} to={`/app/rooms/${room.id}`}>
        <CardHeader
          avatar={<Avatar variant="rounded" src={room.avatar ? room.avatar.url : ""} sx={{ width: 56, height: 56 }}></Avatar>}
          title={<Typography variant="subtitle1">{room.name}</Typography>}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {room.description}
          </Typography>
        </CardContent>
        <Typography sx={{ textAlign: "end", pr: 2, pb: 2 }}>{room.numOfMembers}人</Typography>
      </CardActionArea>
    </Card>
  );
};
