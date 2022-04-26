import { Message } from "../../message/types";
import { User } from "../../user/types";

export type RoomType = {
  rooms: Room[];
  belongingRooms: { byIds: { [key: string]: Room }; allIds: string[] };
  currentRoom: CurrentRoom;
  location: Location;
};

export type Room = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type CreateRoomDTO = {
  name: string;
};

// Does not contain messageIds because the frequency of updates of messages would be very high.
export type CurrentRoom = {
  owners: number[];
  members: number[];
} & Room;

// This contains all of the room contents data including Users and Messages.
export type RoomContent = {
  owners: User[];
  members: User[];
  messages: Message[];
} & Room;

export type NormalizedRoomContent = {
  entities: {
    owners: {
      [key: string]: User;
    };
    members: {
      [key: string]: User;
    };
    messages:
      | {
          [key: string]: Message;
        }
      | undefined;
  };
  result: {
    owners: number[];
    members: number[];
    messages: number[] | undefined;
  } & Room;
};

export type Location = "home" | "room" | "discovery";
