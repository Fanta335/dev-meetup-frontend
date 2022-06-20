import { useAppSelector } from "../../../stores/hooks";
import { selectSearchedrooms } from "../roomSlice";
import { MediumRoomCard } from "./MediumRoomCard";
import { RoomNotDiscoveredImage } from "./RoomNotDiscoveredImage";

export const SearchedRoomList = () => {
  const searchedRooms = useAppSelector(selectSearchedrooms);
  const hasAnySearchedRooms = searchedRooms.allIds.length > 0;

  return (
    <>
      {hasAnySearchedRooms
        ? searchedRooms.allIds.map((id) => {
            const room = searchedRooms.byIds[id];
            return <MediumRoomCard key={id} room={room} />;
          })
        : <RoomNotDiscoveredImage />}
    </>
  );
};
