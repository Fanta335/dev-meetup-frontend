import { normalize, schema } from 'normalizr';
import { Message } from '../../types';

export const normalizeMessages = (data: Message[]) => {
  const messageEntity = new schema.Entity<Message>('messages');
  const messageEchema = { messages: [messageEntity] };
  return normalize({ messages: data }, messageEchema);
};
