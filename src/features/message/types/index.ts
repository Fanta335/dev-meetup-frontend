export type MessageType = {
  currentMessages: CurrentMessages;
  isEstablishingConnection: boolean;
  isConnected: boolean;
};

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

// Use union instead of enum. ref: https://weseek.co.jp/tech/1609/
export const MessageEvent = {
  SendMessage: "send_message",
  ReceiveMessage: "receive_message",
  JoinRoom: "join_room",
  LeaveRoom: "leave_room",
} as const;

export type MessageEventType = typeof MessageEvent[keyof typeof MessageEvent];
