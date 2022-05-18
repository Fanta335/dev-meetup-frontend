import { Avatar, Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { VFC } from "react";
import { SearchedRoom } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../../../stores/hooks";
import { addMemberToRoom } from "../roomSlice";
import { Link } from "react-router-dom";
import { Auth0User } from "../../auth/types";
import { getCurrentUser } from "../../user/utils/getCurrentUser";

type Props = {
  room: SearchedRoom;
};

export const MediumRoomCard: VFC<Props> = ({ room }) => {
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentUser = getCurrentUser(user);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (!currentUser) return;

    const token = await getAccessTokenSilently();
    await dispatch(addMemberToRoom({ token, userId: currentUser.id, roomId: room.id }));
  };

  console.log("room:", room.avatar);

  return (
    <Card sx={{ my: 3 }}>
      <CardActionArea onClick={handleClick} component={Link} to={`/app/rooms/${room.id}`}>
        <CardHeader
          avatar={<Avatar variant="rounded" src={room.avatar ? room.avatar.url : ""} sx={{ width: 56, height: 56 }}></Avatar>}
          title={
            <Typography variant="h5" fontWeight="bold">
              {room.name}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="body1">{room.description}</Typography>
        </CardContent>
        <Grid container justifyContent="flex-end" sx={{ pr: 2, pb: 2 }}>
          <Grid item>
            <PersonIcon color="action" />
          </Grid>
          <Grid item>
            <Typography variant="body1">{room.numOfMembers}人が参加中</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
