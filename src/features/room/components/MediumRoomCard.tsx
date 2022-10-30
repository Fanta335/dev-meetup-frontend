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
import PersonIcon from '@mui/icons-material/Person';
import { FC, memo, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import ChairIcon from '@mui/icons-material/Chair';
import { SearchedRoom } from '../types';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { addMemberToRoom, selectBelongingRooms } from '../roomSlice';
import { Auth0User } from '../../auth/types';
import { getCurrentUser } from '../../user/utils/getCurrentUser';

type Props = {
  room: SearchedRoom;
};

export const MediumRoomCard: FC<Props> = memo(({ room }: Props) => {
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
    <Card sx={{ my: 3 }}>
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
          title={
            <Typography variant="h5" fontWeight="bold">
              {room.name}
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary">
            {room.description}
          </Typography>
        </CardContent>
        <Grid container sx={{ pl: 2 }}>
          {room.tags.map((tag) => {
            return <Chip key={tag.id} label={tag.name} variant="outlined" sx={{ mr: 1, mb: 1 }} />;
          })}
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ pr: 2, pb: 2 }}>
          <Grid item>
            <PersonIcon color="secondary" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{room.numOfMembers}人が参加中</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
});

MediumRoomCard.displayName = 'MediumRoomCard';
