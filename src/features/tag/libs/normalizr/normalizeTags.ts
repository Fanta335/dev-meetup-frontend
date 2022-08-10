import { normalize, schema } from "normalizr";
import { Tag } from "../../types";

export const normalizeTags = (data: Tag[]) => {
  const tagEntity = new schema.Entity<Tag>("allTags");
  const tagSchema = { allTags: [tagEntity] };
  return normalize({ allTags: data }, tagSchema);
};
