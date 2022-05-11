import { normalize, schema } from "normalizr";
import { User } from "../../types";

export const normalizeRoomMembers = (data: User[]) => {
  const memberEntity = new schema.Entity<User>("members");
  const memberSchema = { members: [memberEntity] };
  return normalize({ members: data }, memberSchema);
};
