import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect, VFC } from "react";
import { ForbiddenPage } from "../../../components/Layouts/ForbiddenPage";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { MessageContainer } from "../../message/components/MessageContainer";
import { messageActions, selectIsConnected } from "../../message/messageSlice";
import { UsersList } from "../../user/components/UsersList";
import { fetchRoomContent, roomActions, selectCurrentRoomLoading } from "../roomSlice";

type Props = {
  roomId: string | undefined;
};

export const RoomContent: VFC<Props> = ({ roomId }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCurrentRoomLoading);
  const isConnected = useAppSelector(selectIsConnected);

  console.log("loading: ", loading);

  useEffect(() => {
    // Handle room joining.
    const handleJoinRoom = async (newRoomId: string) => {
      const token = await getAccessTokenSilently();

      // Get room content from api.
      await dispatch(fetchRoomContent({ token: token, roomId: newRoomId }));

      // Establish new socket connection.
      if (!isConnected) {
        console.log("connecting new socket.");
        dispatch(messageActions.startConnecting({ token: token, roomId: newRoomId }));
      }

      dispatch(roomActions.joinRoom({ roomId: newRoomId }));
    };

    const handleLeaveRoom = (prevRoomId: string | undefined) => {
      if (!prevRoomId) return;

      dispatch(roomActions.leaveRoom({ roomId: prevRoomId }));
    };

    if (roomId) {
      handleJoinRoom(roomId);
    }

    // Leave from previous room before moving to another room.
    return () => handleLeaveRoom(roomId);
  }, [dispatch, getAccessTokenSilently, roomId, isConnected]);

  return (
    <>
      {loading === "failed" ? (
        <ForbiddenPage />
      ) : (
        <Box sx={{ display: "flex", height: "100%" }}>
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
};
