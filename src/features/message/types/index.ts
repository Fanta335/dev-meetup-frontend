export type MessageType = {
  currentMessages: CurrentMessages;
  hasNext: boolean;
  isEstablishingConnection: boolean;
  isConnected: boolean;
  messageEdit: MessageEdit;
  messageReply: MessageReply;
};

export type Message = {
  id: number;
  authorId: number;
  roomId: number;
  content: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  virtualListId: number | undefined;
};

export type CurrentMessages = {
  byIds: {
    [key: string]: Message;
  };
  allIds: number[];
};

export type MessageEdit = {
  messageId: number;
  isEditing: boolean;
};

export type MessageReply = {
  parentMessageId: number | null;
  isReplying: boolean;
};

export type CreateMessageDTO = {
  content: string;
  roomId: number;
};

// Use union instead of enum. ref: https://weseek.co.jp/tech/1609/
export const MessageEvent = {
  SendMessage: "send_message",
  RemoveMessage: "remove_message",
  ReceiveMessage: "receive_message",
  ReceiveMessageRemoved: "receive_message_removed",
  JoinRoom: "join_room",
  LeaveRoom: "leave_room",
  UpdateMessage: "update_message",
} as const;

export type MessageEventType = typeof MessageEvent[keyof typeof MessageEvent];
