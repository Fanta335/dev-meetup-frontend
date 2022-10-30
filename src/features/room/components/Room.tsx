import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../stores/hooks';
import { roomActions } from '../roomSlice';
import { RoomContent } from './RoomContent';

export const Room = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(roomActions.changeLocation('room'));
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <RoomContent roomId={id} />
      </Box>
    </Box>
  );
};
