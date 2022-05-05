import { Message } from "../../message/types";
import { User } from "../../user/types";

export type RoomType = {
  rooms: Room[];
  belongingRooms: BelongingRooms;
  currentRoom: CurrentRoom;
  searchedRooms: SearchedRooms;
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

export type BelongingRooms = {
  byIds: {
    [key: string]: Room;
  };
  allIds: string[];
};

// Does not contain messageIds because the frequency of updates of messages would be very high.
export type CurrentRoom = {
  owners: number[];
  members: number[];
} & Room;

export type SearchedRooms = {
  byIds: {
    [key: string]: SearchedRoom;
  };
  allIds: string[];
};

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

export type SearchedRoom = {
  description: string;
  numOfMembers: number;
} & Room;

export type SearchOptions = {
  query: string;
  offset: number;
  limit: number;
  sort: SortOptionsType;
  order: OrderOptionsType;
};

export const SortOptions = {
  CreatedAt: "date",
} as const;
export type KeyOfSortOptions = keyof typeof SortOptions;
export type SortOptionsType = typeof SortOptions[KeyOfSortOptions];

export const OrderOptions = {
  ASC: "a",
  DESC: "d",
} as const;
export type KeyOfOrderOptions = keyof typeof OrderOptions;
export type OrderOptionsType = typeof OrderOptions[KeyOfOrderOptions];
