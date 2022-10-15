export type TagType = {
  allTags: AllTags;
  currentTag: Tag | null;
};

export type Tag = {
  id: number;
  name: string;
  description: string;
};

export type AllTags = {
  byIds: {
    [key: string]: Tag;
  };
  allIds: number[];
};
