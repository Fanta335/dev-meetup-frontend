import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, VFC } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
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
    };

    if (roomId !== undefined) {
      fetchRoomDetail(roomId);
    }
  }, [dispatch, getAccessTokenSilently, roomId]);
  console.log('current room: ',currentRoom);

  return <p>this is room {roomId} content.</p>;
};
