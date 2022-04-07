import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../stores/store";
import { CreateRoomDTO, Room } from "../room/types";

const apiUrl = process.env.REACT_APP_SERVER_URL;
const initialState: { rooms: Room[]; ownRooms: Room[] } = {
  rooms: [
    {
      id: 0,
      name: "",
      owners: [],
      members: [],
      messages: [],
      createdAt: "",
      updatedAt: "",
    },
  ],
  ownRooms: [
    {
      id: 0,
      name: "",
      owners: [],
      members: [],
      messages: [],
      createdAt: "",
      updatedAt: "",
    },
  ],
};

export const postRoom = createAsyncThunk<Room, { token: string; createRoomDTO: CreateRoomDTO }>("room/postRoom", async ({ token, createRoomDTO }) => {
  const { name } = createRoomDTO;
  const res = await axios.post(
    `${apiUrl}/rooms`,
    {
      name: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
});

export const fetchAsyncGetAllRooms = createAsyncThunk<Room[], { token: string }>("room/fetchAllRooms", async ({ token }) => {
  const res = await axios.get(`${apiUrl}/rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

export const fetchAsyncGetOwnRooms = createAsyncThunk<Room[], { token: string }>("room/fetchOwnRooms", async ({ token }) => {
  const res = await axios.get(`${apiUrl}/rooms/own-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetAllRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    });
    builder.addCase(fetchAsyncGetOwnRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      state.ownRooms = action.payload;
    });
  },
});

export const selectRooms = (state: RootState) => state.room.rooms;
export const selectOwnRooms = (state: RootState) => state.room.ownRooms;

export const roomReducer = roomSlice.reducer;
