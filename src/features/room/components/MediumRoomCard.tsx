import { Avatar, Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { VFC } from "react";
import { SearchedRoom } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../../../stores/hooks";
import { addMemberToRoom } from "../roomSlice";
import { Link } from "react-router-dom";

type Props = {
  room: SearchedRoom;
};

export const MediumRoomCard: VFC<Props> = ({ room }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const currentUser = user?.[process.env.REACT_APP_API_NAMESPACE + '/mysqlUser'];
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const token = await getAccessTokenSilently();
    await dispatch(addMemberToRoom({token, userId: currentUser.id, roomId: room.id}));
  };

  return (
    <Card sx={{ my: 3 }}>
      <CardActionArea
        onClick={handleClick}
        component={Link}
        to={`/app/rooms/${room.id}`}
      >
        <CardHeader avatar={<Avatar variant="rounded"></Avatar>} title={<Typography variant="subtitle1">{room.name}</Typography>} />
        <CardContent>
          <Typography variant="body1">{room.description}</Typography>
        </CardContent>
        <Grid container justifyContent="flex-end" sx={{ pr: 2, pb: 2 }}>
          <Grid item>
            <PersonIcon color="action" />
          </Grid>
          <Grid item>
            <Typography>{room.numOfMembers}人</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
