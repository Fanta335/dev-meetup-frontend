import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import { useEffect, VFC } from "react";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { MessageContainer } from "../../message/components/MessageContainer";
import { UsersList } from "../../user/components/UsersList";
import { fetchRoomContent, selectCurrentRoom } from "../roomSlice";

type Props = {
  roomId: string | undefined;
};

export const RoomContent: VFC<Props> = ({ roomId }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const currentRoom = useAppSelector(selectCurrentRoom);

  useEffect(() => {
    const fetchRoomDetail = async (id: string) => {
      const token = await getAccessTokenSilently();
      await dispatch(fetchRoomContent({ token, roomId: id }));

      const socket = io("http://localhost:3000", {
        auth: {
          token: token,
        },
      });
      socket.emit("joinRoom", roomId);
      socket.on("joinRoomFromServer", (roomId: string) => console.log("joined room: ", roomId));
    };

    if (roomId !== undefined) {
      fetchRoomDetail(roomId);
    }
  }, [dispatch, getAccessTokenSilently, roomId]);
  console.log("current room: ", currentRoom);

  return (
    <>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <MessageContainer />
        </Box>
          <UsersList />
      </Box>
    </>
  );
};
