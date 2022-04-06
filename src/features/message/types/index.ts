export type Message = {
  id: number;
  authorId: number;
  roomId: number;
  content: string;
  parent: Message;
  children: Message[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
