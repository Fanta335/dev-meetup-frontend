import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../stores/store";
import { fetchRoomContent } from "../room/roomSlice";
import { NormalizedRoomContent } from "../room/types";
import { CreateMessageDTO, CurrentMessages, Message } from "./types";

const apiUrl = process.env.REACT_APP_SERVER_URL;
const initialState: { currentMessages: CurrentMessages } = {
  currentMessages: {
    byIds: {
      "0": {
        id: 0,
        authorId: 0,
        roomId: 0,
        content: "",
        parent: null,
        children: null,
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
      },
    },
    allIds: ["0"],
  },
};

export const postMessage = createAsyncThunk<Message, { token: string; createMessageDTO: CreateMessageDTO }>(
  "message/postMessage",
  async ({ token, createMessageDTO }) => {
    const { content, roomId } = createMessageDTO;
    const res = await axios.post<Message>(
      `${apiUrl}/messages`,
      {
        content: content,
        roomId: roomId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  }
);

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postMessage.fulfilled, (state, action: PayloadAction<Message>) => {
      const newMessage = action.payload;
      state.currentMessages.byIds[newMessage.id] = newMessage;
      state.currentMessages.allIds.push(newMessage.id.toString());
    });
    builder.addCase(fetchRoomContent.fulfilled, (state, action: PayloadAction<NormalizedRoomContent>) => {
      const data = action.payload;
      console.log('all data: ', data);
      console.log('room messages: ', data.entities.messages, data.result.messages);
      if (data.entities.messages !== undefined && data.result.messages !== undefined) {
        state.currentMessages.byIds = data.entities.messages;
        state.currentMessages.allIds = data.result.messages;
      }else{
        console.log('message is undefined!');
        state.currentMessages.byIds = initialState.currentMessages.byIds;
        state.currentMessages.allIds = initialState.currentMessages.allIds;
      }
    });
  },
});

export const selectCurrentMessages = (state: RootState) => state.message.currentMessages;

export const messageReducer = messageSlice.reducer;
