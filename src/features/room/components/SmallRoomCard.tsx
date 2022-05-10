import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import { VFC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../stores/hooks";
import { Auth0User } from "../../auth/types";
import { addMemberToRoom } from "../roomSlice";
import { SearchedRoom } from "../types";

type Props = {
  room: SearchedRoom;
};

export const SmallRoomCard: VFC<Props> = ({ room }) => {
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentUser = user?.[process.env.REACT_APP_API_NAMESPACE + "/mysqlUser"];
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const token = await getAccessTokenSilently();
    await dispatch(addMemberToRoom({ token, userId: currentUser.id, roomId: room.id }));
  };

  return (
    <Card sx={{ m: 1 }}>
      <CardActionArea onClick={handleClick} component={Link} to={`/app/rooms/${room.id}`}>
        <CardHeader avatar={<Avatar variant="rounded"></Avatar>} title={<Typography variant="subtitle1">{room.name}</Typography>} />
        <CardContent>
          <Typography variant="body1">{room.description}</Typography>
        </CardContent>
        <Typography sx={{ textAlign: "end", pr: 2, pb: 2 }}>{room.numOfMembers}人</Typography>
      </CardActionArea>
    </Card>
  );
};
