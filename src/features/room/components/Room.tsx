import { useParams } from "react-router-dom";
import { RoomContent } from "./RoomContent";

export const Room = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <p>here is room {id} page.</p>
      <RoomContent roomId={id} />
    </div>
  );
};
