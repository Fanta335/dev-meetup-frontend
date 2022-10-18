export type TagType = {
  allTags: AllTags;
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
