import { normalize, schema } from "normalizr";
import { Room } from "../../types";

export const normalizeBelongingRooms = (data: Room[]) => {
  const belongingRoomEntity = new schema.Entity<Room>("belongingRooms");
  const belongingRoomSchema = { belongingRooms: [belongingRoomEntity] };
  return normalize({ belongingRooms: data }, belongingRoomSchema);
};
