import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize, schema } from "normalizr";
import { RootState } from "../../stores/store";
import { CreateRoomDTO, Room, CurrentRoom, RoomContent, NormalizedRoomContent, Location, RoomType } from "../room/types";

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: RoomType = {
  rooms: [
    {
      id: 0,
      name: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
    },
  ],
  belongingRooms: {
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
    owners: [],
    members: [],
  },
  location: "home",
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

export const fetchAsyncGetBelongingRooms = createAsyncThunk<Room[], { token: string }>("room/fetchBelongingRooms", async ({ token }) => {
  const res = await axios.get<Room[]>(`${apiUrl}/rooms/belonging-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

// This method is shared between 3 reducers: Room, User, Message.
export const fetchRoomContent = createAsyncThunk<NormalizedRoomContent, { token: string; roomId: string }>(
  "room/fetchRoomContent",
  async ({ token, roomId: id }) => {
    const res = await axios.get<RoomContent>(`${apiUrl}/rooms/${id}/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const owner = new schema.Entity("owners");
    const member = new schema.Entity("members");
    const message = new schema.Entity("messages");
    const mySchema = { owners: [owner], members: [member], messages: [message] };
    const normalizedData = normalize(res.data, mySchema) as NormalizedRoomContent;

    // console.log("normalizedData: ", normalizedData);

    return normalizedData;
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    changeLocation(state, action: PayloadAction<Location>) {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRoom.fulfilled, (state, action: PayloadAction<Room>) => {
      const newRoom = action.payload;
      state.belongingRooms.byIds[newRoom.id] = newRoom;
      state.belongingRooms.allIds.push(newRoom.id.toString());
    });
    builder.addCase(fetchAsyncGetAllRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    });
    builder.addCase(fetchAsyncGetBelongingRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      const data = action.payload;
      const belongingRoomEntity = new schema.Entity<Room>("belongingRooms");
      const belongingRoomSchema = { belongingRooms: [belongingRoomEntity] };
      const normalizedBelongingRoomsData = normalize({ belongingRooms: data }, belongingRoomSchema);
      if (normalizedBelongingRoomsData.entities.belongingRooms !== undefined) {
        state.belongingRooms.byIds = normalizedBelongingRoomsData.entities.belongingRooms;
        state.belongingRooms.allIds = normalizedBelongingRoomsData.result.belongingRooms;
      }
    });
    builder.addCase(fetchRoomContent.fulfilled, (state, action: PayloadAction<NormalizedRoomContent>) => {
      const data = action.payload;
      // Do not monitor message referenses in currentRoom state.
      const currentRoom: CurrentRoom = {
        id: data.result.id,
        name: data.result.name,
        owners: data.result.owners,
        members: data.result.members,
        createdAt: data.result.createdAt,
        updatedAt: data.result.updatedAt,
        deletedAt: data.result.deletedAt,
      };
      state.currentRoom = currentRoom;
    });
  },
});

export const { changeLocation } = roomSlice.actions;

export const selectRooms = (state: RootState) => state.room.rooms;
export const selectBelongingRooms = (state: RootState) => state.room.belongingRooms;
export const selectCurrentRoom = (state: RootState) => state.room.currentRoom;
export const selectLocation = (state: RootState) => state.room.location;

export const roomReducer = roomSlice.reducer;
