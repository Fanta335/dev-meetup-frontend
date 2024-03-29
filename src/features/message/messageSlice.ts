import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSelector } from 'reselect';
import { RootState } from '../../stores/store';
import { fetchRoomContent } from '../room/roomSlice';
import { NormalizedRoomContent } from '../room/types';
import { normalizeMessages } from './lib/normalizr/normalizeMessages';
import { Message, MessageType } from './types';

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: MessageType = {
  currentMessages: {
    byIds: {},
    allIds: [],
    isLoading: false,
  },
  messageListMap: {},
  isEstablishingConnection: false,
  isConnected: false,
  messageEdit: {
    messageId: 0,
    isEditing: false,
  },
  messageReply: {
    parentMessageId: null,
    isReplying: false,
  },
};

export const fetchOneMessage = createAsyncThunk<Message, { token: string; messageId: number }>(
  'message/fetchOneMessage',
  async ({ token, messageId }) => {
    const res = await axios.get<Message>(`${apiUrl}/messages/${messageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
);

export const fetchMoreMessages = createAsyncThunk<
  Message[],
  { token: string; roomId: string; searchParams: string }
>('message/fetchMoreMessages', async ({ token, roomId, searchParams }) => {
  const res = await axios.get<Message[]>(`${apiUrl}/rooms/${roomId}/messages?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
});

export const fetchAllMessageIds = createAsyncThunk<
  { id: number }[],
  { token: string; roomId: string }
>('message/fetchAllMessageIds', async ({ token, roomId }) => {
  const res = await axios.get<{ id: number }[]>(`${apiUrl}/rooms/${roomId}/messages/ids`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
});

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    startConnecting: (state, action: PayloadAction<{ token: string; roomId: string }>) => {
      state.isEstablishingConnection = true;
      // console.log("start connecting...");
    },
    connectionEstablished: (state) => {
      state.isEstablishingConnection = false;
      state.isConnected = true;
      // console.log("connection established.");
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        roomId: string;
        content: string;
        parentId: number | null;
      }>
    ) => {
      console.log('send message: ', action.payload);
    },
    removeMessage: (state, action: PayloadAction<{ roomId: string; messageId: number }>) => {
      console.log('send message to remove: ', action.payload);
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      console.log('received message: ', message);

      const isNewMessage = !(message.id in state.currentMessages.byIds);
      if (isNewMessage) {
        state.currentMessages.allIds.push(message.id);
      }
      state.currentMessages.byIds[message.id] = message;
    },
    receiveMessageRemoved: (state, action: PayloadAction<Message>) => {
      const messageId = action.payload.id;
      delete state.currentMessages.byIds[messageId];
      const newAllIds = state.currentMessages.allIds.filter((i) => {
        return i !== messageId;
      });
      state.currentMessages.allIds = newAllIds;
    },
    updateMessage: (
      state,
      action: PayloadAction<{
        roomId: string;
        messageId: number;
        content: string;
      }>
    ) => {
      console.log('update message: ', action.payload);
    },
    startEdit: (state, action: PayloadAction<{ messageId: number }>) => {
      state.messageEdit.messageId = action.payload.messageId;
      state.messageEdit.isEditing = true;
    },
    endEdit: (state) => {
      state.messageEdit.isEditing = false;
    },
    startReplying: (state, action: PayloadAction<{ parentMessageId: number }>) => {
      state.messageReply.parentMessageId = action.payload.parentMessageId;
      state.messageReply.isReplying = true;
    },
    endReplying: (state) => {
      state.messageReply.parentMessageId = null;
      state.messageReply.isReplying = false;
    },
    setVirtualListId: (
      state,
      action: PayloadAction<{ messageId: number; virtualListId: number }>
    ) => {
      const { messageId, virtualListId } = action.payload;
      if (messageId in state.currentMessages.byIds) {
        state.currentMessages.byIds[messageId].virtualListId = virtualListId;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchRoomContent.fulfilled,
      (state, action: PayloadAction<NormalizedRoomContent>) => {
        const data = action.payload;
        // console.log("room messages: ", data.entities.messages, data.result.messages);
        if (data.entities.messages !== undefined && data.result.messages !== undefined) {
          state.currentMessages.byIds = data.entities.messages;
          // state.currentMessages.allIds = data.result.messages;
        } else {
          state.currentMessages.byIds = initialState.currentMessages.byIds;
          state.currentMessages.allIds = initialState.currentMessages.allIds;
        }
      }
    );
    builder.addCase(fetchOneMessage.fulfilled, (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      state.currentMessages.byIds = {
        [message.id]: message,
        ...state.currentMessages.byIds,
      };
    });
    builder.addCase(fetchMoreMessages.pending, (state) => {
      state.currentMessages.isLoading = true;
    });
    builder.addCase(fetchMoreMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
      const messages = action.payload;
      const normalizedMessages = normalizeMessages(messages);
      // state.currentMessages.allIds = [...normalizedMessages.result.messages, ...state.currentMessages.allIds];
      state.currentMessages.byIds = {
        ...normalizedMessages.entities.messages,
        ...state.currentMessages.byIds,
      };
      state.currentMessages.isLoading = false;
    });
    builder.addCase(
      fetchAllMessageIds.fulfilled,
      (state, action: PayloadAction<{ id: number }[]>) => {
        const messages = action.payload;
        messages.forEach((message, id) => {
          return (state.messageListMap[message.id] = id);
        });
        state.currentMessages.allIds = messages.map((message) => {
          return message.id;
        });
      }
    );
  },
});

export const messageActions = messageSlice.actions;

export const selectCurrentMessages = (state: RootState) => {
  return state.message.currentMessages;
};
export const selectMessageListMap = (state: RootState) => {
  return state.message.messageListMap;
};
export const selectCurrentMessageId = (state: RootState, messageId: number) => {
  return messageId;
};
export const selectIsConnected = (state: RootState) => {
  return state.message.isConnected;
};
export const selectMessageEdit = (state: RootState) => {
  return state.message.messageEdit;
};
export const selectMessageReply = (state: RootState) => {
  return state.message.messageReply;
};

export const selectMessageById = createSelector(
  [selectCurrentMessages, selectCurrentMessageId],
  (messages, messageId) => {
    return messages.byIds[messageId.toString()];
  }
);

export const messageReducer = messageSlice.reducer;
