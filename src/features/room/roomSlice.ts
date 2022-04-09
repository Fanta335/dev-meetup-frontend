import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize, schema } from "normalizr";
import { RootState } from "../../stores/store";
import { CreateRoomDTO, Room, CurrentRoom, RoomContent } from "../room/types";

const apiUrl = process.env.REACT_APP_SERVER_URL;
const initialState: { rooms: Room[]; ownRooms: { byIds: { [key: string]: Room }; allIds: string[] }; currentRoom: CurrentRoom } = {
  rooms: [
    {
      id: 0,
      name: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    },
  ],
  ownRooms: {
    byIds: {
      "0": {
        id: 0,
        name: "",
        createdAt: "",
        updatedAt: "",
        deletedAt: null,
      },
    },
    allIds: ["0"],
  },
  currentRoom: {
    id: 0,
    name: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
    ownerIds: [],
    memberIds: [],
  },
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

// This method is shared between 3 reducers: Room, User, Message.
export const fetchRoomContent = createAsyncThunk<RoomContent, { token: string; roomId: string }>("room/fetchRoomContent", async ({ token, roomId: id }) => {
  const res = await axios.get(`${apiUrl}/rooms/${id}`, {
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
    builder.addCase(postRoom.fulfilled, (state, action: PayloadAction<Room>) => {
      const newRoom = action.payload;
      state.ownRooms.byIds[newRoom.id] = newRoom;
      state.ownRooms.allIds.push(newRoom.id.toString());
    });
    builder.addCase(fetchAsyncGetAllRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    });
    builder.addCase(fetchAsyncGetOwnRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      const data = action.payload;
      const ownRoomEntity = new schema.Entity<Room>("ownRooms");
      const ownRoomSchema = { ownRooms: [ownRoomEntity] };
      const normalizedOwnRoomsData = normalize({ ownRooms: data }, ownRoomSchema);
      if (normalizedOwnRoomsData.entities.ownRooms !== undefined) {
        state.ownRooms.byIds = normalizedOwnRoomsData.entities.ownRooms;
        state.ownRooms.allIds = normalizedOwnRoomsData.result.ownRooms;
      }
    });
    builder.addCase(fetchRoomContent.fulfilled, (state, action: PayloadAction<RoomContent>) => {
      const data = action.payload;
      const owner = new schema.Entity("owners");
      const member = new schema.Entity("members");
      const message = new schema.Entity("messages");
      const mySchema = { owners: [owner], members: [member], messages: [message] };
      const normalizedData = normalize(data, mySchema);
      console.log(normalizedData);

      state.currentRoom = normalizedData.result;
    });
  },
});

export const selectRooms = (state: RootState) => state.room.rooms;
export const selectOwnRooms = (state: RootState) => state.room.ownRooms;
export const selectCurrentRoom = (state: RootState) => state.room.currentRoom;

export const roomReducer = roomSlice.reducer;
