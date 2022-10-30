import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import { FC, memo, useCallback, useEffect } from 'react';
import { ForbiddenPage } from '../../misc/routes/ForbiddenPage';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import { MessageContainer } from '../../message/components/MessageContainer';
import { messageActions, selectIsConnected } from '../../message/messageSlice';
import { UsersList } from '../../user/components/UsersList';
import { fetchRoomContent, roomActions, selectCurrentRoomLoading } from '../roomSlice';

type Props = {
  roomId: string | undefined;
};

export const RoomContent: FC<Props> = memo(({ roomId }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCurrentRoomLoading);
  const isConnected = useAppSelector(selectIsConnected);

  const handleJoinRoom = useCallback(
    async (newRoomId: string) => {
      const token = await getAccessTokenSilently();

      // Get room content from api.
      await dispatch(fetchRoomContent({ token, roomId: newRoomId }));

      // Establish new socket connection.
      if (!isConnected) {
        // console.log("connecting new socket.");
        dispatch(messageActions.startConnecting({ token, roomId: newRoomId }));
      }

      dispatch(roomActions.joinRoom({ roomId: newRoomId }));
    },
    [dispatch, getAccessTokenSilently, isConnected]
  );

  const handleLeaveRoom = useCallback(
    (prevRoomId: string | undefined) => {
      if (!prevRoomId) return;

      dispatch(roomActions.leaveRoom({ roomId: prevRoomId }));
    },
    [dispatch]
  );

  useEffect(() => {
    // Handle room joining.
    if (roomId) {
      handleJoinRoom(roomId);
    }

    // Leave from previous room before moving to another room.
    return () => {
      return handleLeaveRoom(roomId);
    };
  }, [handleJoinRoom, handleLeaveRoom, roomId]);

  return (
    <>
      {loading === 'failed' ? (
        <ForbiddenPage />
      ) : (
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box sx={{ flexGrow: 1 }}>
            <MessageContainer />
          </Box>
          <Box>
            <UsersList />
          </Box>
        </Box>
      )}
    </>
  );
});

RoomContent.displayName = 'RoomContent';
