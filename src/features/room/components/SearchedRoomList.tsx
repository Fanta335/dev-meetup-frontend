import { useAppSelector } from "../../../stores/hooks";
import { selectSearchedrooms } from "../roomSlice";
import { MediumRoomCard } from "./MediumRoomCard";

export const SearchedRoomList = () => {
  const searchedRooms = useAppSelector(selectSearchedrooms);
  const hasAnySearchedRooms = !("0" in searchedRooms.byIds);

  return (
    <>
      {hasAnySearchedRooms
        ? searchedRooms.allIds.map((id) => {
            const room = searchedRooms.byIds[id];
            return <MediumRoomCard key={id} room={room} />;
          })
        : "no rooms matched."}
    </>
  );
};
