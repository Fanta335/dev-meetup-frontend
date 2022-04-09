import { Message } from "../../message/types";
import { User } from "../../user/types";

export type Room = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type CreateRoomDTO = {
  name: string;
};

// Does not contain messageIds because the frequency of updates of messages would be very high.
export type CurrentRoom = {
  ownerIds: number[];
  memberIds: number[];
} & Room;

export type RoomContent = {
  owners: User[];
  members: User[];
  messages: Message[];
} & Room;
