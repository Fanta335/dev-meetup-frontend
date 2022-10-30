import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ChairIcon from '@mui/icons-material/Chair';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { Auth0User } from '../../auth/types';
import { getCurrentUser } from '../../user/utils/getCurrentUser';
import { addMemberToRoom, selectBelongingRooms } from '../roomSlice';
import { SearchedRoom } from '../types';

type Props = {
  room: SearchedRoom;
};

export const SmallRoomCard: FC<Props> = memo(({ room }: Props) => {
  const { getAccessTokenSilently, user } = useAuth0<Auth0User>();
  const currentUser = getCurrentUser(user);
  const belongingRooms = useAppSelector(selectBelongingRooms);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(async () => {
    if (!currentUser) return;
    if (room.id in belongingRooms.byIds) return;

    const token = await getAccessTokenSilently();
    await dispatch(addMemberToRoom({ token, roomId: room.id }));
  }, [belongingRooms.byIds, currentUser, dispatch, getAccessTokenSilently, room.id]);

  return (
    <Card sx={{ m: 1 }}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <CardActionArea onClick={handleClick} component={Link} to={`/app/rooms/${room.id}`}>
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              src={room.avatar ? room.avatar.url : ''}
              sx={{ width: 56, height: 56 }}
            >
              <ChairIcon fontSize="large" />
            </Avatar>
          }
          title={<Typography variant="h6">{room.name}</Typography>}
        />
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary">
            {room.description}
          </Typography>
        </CardContent>
        <Grid container sx={{ px: 2 }}>
          {room.tags.map((tag) => {
            return <Chip key={tag.id} label={tag.name} variant="outlined" sx={{ mr: 1, mb: 1 }} />;
          })}
        </Grid>
        <Grid container justifyContent="end">
          <PersonIcon color="secondary" />
          <Typography sx={{ textAlign: 'end', pb: 2, pr: 2 }}>{room.numOfMembers}人</Typography>
        </Grid>
      </CardActionArea>
    </Card>
  );
});

SmallRoomCard.displayName = 'SmallRoomCard';
