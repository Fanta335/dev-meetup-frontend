export type Message = {
  id: number;
  authorId: number;
  roomId: number;
  content: string;
  // parent and children are the referense of message id.
  parent: number | null;
  children: number[] | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type CurrentMessages = {
  byIds: {
    [key: string]: Message;
  };
  allIds: string[];
};

export type CreateMessageDTO = {
  content: string;
  roomId: number;
};
