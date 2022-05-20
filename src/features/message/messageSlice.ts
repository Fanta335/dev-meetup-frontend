import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";
import { RootState } from "../../stores/store";
import { fetchRoomContent } from "../room/roomSlice";
import { NormalizedRoomContent } from "../room/types";
import { Message, MessageType } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: MessageType = {
  currentMessages: {
    byIds: {
      // "0": {
      //   id: 0,
      //   authorId: 0,
      //   roomId: 0,
      //   content: "",
      //   parentId: null,
      //   createdAt: "",
      //   updatedAt: "",
      //   deletedAt: null,
      // },
    },
    allIds: [],
  },
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

export const fetchCurrenMessages = createAsyncThunk<Message[], { token: string; roomId: number }>("room/fetchCurrentMessages", async ({ token, roomId }) => {
  const res = await axios.get<Message[]>(`${apiUrl}/messages/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    startConnecting: (state, action: PayloadAction<{ token: string; roomId: string }>) => {
      state.isEstablishingConnection = true;
      console.log("start connecting...");
    },
    connectionEstablished: (state) => {
      state.isEstablishingConnection = false;
      state.isConnected = true;
      console.log("connection established.");
    },
    sendMessage: (state, action: PayloadAction<{ roomId: string; content: string; parentId: number | null }>) => {
      console.log("send message: ", action.payload);
    },
    removeMessage: (state, action: PayloadAction<{ roomId: string; messageId: number }>) => {
      console.log("send message to remove: ", action.payload);
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      console.log("received message: ", message);

      const isNewMessage = !(message.id in state.currentMessages.byIds);
      if (isNewMessage) {
        state.currentMessages.allIds.push(message.id);
      }
      state.currentMessages.byIds[message.id] = message;
    },
    receiveMessageRemoved: (state, action: PayloadAction<Message>) => {
      const messageId = action.payload.id;
      delete state.currentMessages.byIds[messageId];
      const newAllIds = state.currentMessages.allIds.filter((i) => i !== messageId);
      state.currentMessages.allIds = newAllIds;
    },
    updateMessage: (state, action: PayloadAction<{ roomId: string; messageId: number; content: string }>) => {
      console.log("update message: ", action.payload);
    },
    // joinRoom: (state, action: PayloadAction<{ roomId: string }>) => {
    //   console.log("join room");
    // },
    // leaveRoom: (state, action: PayloadAction<{ roomId: string }>) => {
    //   console.log("leave room");
    // },
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
    clearCurrentMessages: (state) => {
      state.currentMessages.byIds = {};
      state.currentMessages.allIds = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomContent.fulfilled, (state, action: PayloadAction<NormalizedRoomContent>) => {
      const data = action.payload;
      // console.log("room messages: ", data.entities.messages, data.result.messages);
      if (data.entities.messages !== undefined && data.result.messages !== undefined) {
        state.currentMessages.byIds = data.entities.messages;
        state.currentMessages.allIds = data.result.messages;
      } else {
        console.log("This room has no messages!");
        state.currentMessages.byIds = initialState.currentMessages.byIds;
        state.currentMessages.allIds = initialState.currentMessages.allIds;
      }
    });
  },
});

export const messageActions = messageSlice.actions;

export const selectCurrentMessages = (state: RootState) => state.message.currentMessages;
export const selectCurrentMessageId = (state: RootState, messageId: number) => messageId;
export const selectIsConnected = (state: RootState) => state.message.isConnected;
export const selectMessageEdit = (state: RootState) => state.message.messageEdit;
export const selectMessageReply = (state: RootState) => state.message.messageReply;

export const selectMessageById = createSelector([selectCurrentMessages, selectCurrentMessageId], (messages, messageId) => messages.byIds[messageId.toString()]);

export const messageReducer = messageSlice.reducer;
