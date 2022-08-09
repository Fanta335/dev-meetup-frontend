import { Message } from "../../message/types";
import { User } from "../../user/types";

export type RoomType = {
  belongingRooms: BelongingRooms;
  ownRooms: OwnRooms;
  currentRoom: CurrentRoom;
  searchedRooms: SearchedRooms;
  location: Location;
  isRoomMemberDrawerOpen: boolean;
  roomAvatarPreviewUrl: string | null;
  invitation: Invitation | null;
};

export type Room = {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
  avatar: Avatar;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Avatar = {
  id: number;
  key: string;
  url: string;
};

export type CreateRoomDTO = {
  name: string;
  description: string;
  isPrivate: boolean;
  file: File;
};

export type UpdateRoomDTO = {
  name: string;
  description: string;
  isPrivate: boolean;
};

export type BelongingRooms = {
  byIds: {
    [key: string]: Room;
  };
  allIds: string[];
};

export type OwnRooms = {
  allIds: string[];
};

// Does not contain messageIds because the frequency of updates of messages would be very high.
export type CurrentRoom = {
  entity: {
    owners: number[];
    members: number[];
  } & Room;
  loading: LoadingRoomType;
};

export type LoadingRoomType = "idle" | "pending" | "succeeded" | "failed";

export type SearchedRooms = {
  byIds: {
    [key: string]: SearchedRoom;
  };
  allIds: string[];
  count: number;
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

export type Location = "profile" | "room" | "discovery";

export type SearchedRoom = {
  description: string;
  numOfMembers: number;
} & Room;

// 'offset' and 'limit' are actually numeral values, but search parameter itself should be string type.
export type SearchParamsType = {
  query: string;
  offset: string;
  limit: string;
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

export type Invitation = {
  id: string;
  roomId: number;
  url: string;
};
