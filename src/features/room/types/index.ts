import { Message } from "../../message/types";
import { User } from "../../user/types";

export type Room = {
  id: number;
  name: string;
  owners: User[];
  members: User[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};
