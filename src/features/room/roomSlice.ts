import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize, schema } from "normalizr";
import { AsyncThunkConfig, RootState } from "../../stores/store";
import { Room, CurrentRoom, RoomContent, NormalizedRoomContent, Location, RoomType, SearchedRoom } from "../room/types";
import { normalizeBelongingRooms } from "./libs/normalizr/normalizeBelongingRooms";

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: RoomType = {
  belongingRooms: {
    byIds: {},
    allIds: [],
  },
  currentRoom: {
    entity: {
      id: 0,
      name: "",
      description: "",
      avatar: {
        id: 0,
        key: "",
        url: "",
      },
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      owners: [],
      members: [],
    },
    loading: "idle",
  },
  searchedRooms: {
    byIds: {},
    allIds: [],
  },
  location: "home",
  isRoomMemberDrawerOpen: false,
};

export const postRoom = createAsyncThunk<Room, { token: string; formData: FormData }>("room/postRoom", async ({ token, formData }) => {
  const res = await axios.post(`${apiUrl}/rooms`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

export const updateRoom = createAsyncThunk<Room, { token: string; roomId: number; formData: FormData }>(
  "room/updateRoom",
  async ({ token, roomId, formData }) => {
    const res = await axios.put(`${apiUrl}/rooms/${roomId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
);

export const fetchAsyncGetBelongingRooms = createAsyncThunk<Room[], { token: string; userId: string }>(
  "room/fetchBelongingRooms",
  async ({ token, userId }) => {
    const res = await axios.get<Room[]>(`${apiUrl}/users/${userId}/belonging-rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetch belonging rooms: ", res.data);
    return res.data;
  }
);

// [Attention] This method is shared between 3 reducers: Room, User, Message.
export const fetchRoomContent = createAsyncThunk<NormalizedRoomContent, { token: string; roomId: string }, AsyncThunkConfig<{ errorMessage: string }>>(
  "room/fetchRoomContent",
  async ({ token, roomId: id }, thunkAPI) => {
    let res;
    try {
      res = await axios.get<RoomContent>(`${apiUrl}/rooms/${id}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: "You are not a member of this room." });
    }
    const owner = new schema.Entity("owners");
    const member = new schema.Entity("members");
    const message = new schema.Entity("messages");
    const mySchema = { owners: [owner], members: [member], messages: [message] };
    const normalizedData = normalize(res?.data, mySchema) as NormalizedRoomContent;

    // console.log("normalizedData: ", normalizedData);

    return normalizedData;
  }
);

export const searchAsyncRooms = createAsyncThunk<SearchedRoom[], { token: string; searchParams: string }>(
  "room/search-rooms",
  async ({ token, searchParams }) => {
    const res = await axios.get<SearchedRoom[]>(`${apiUrl}/rooms/search?${searchParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("searched rooms: ", res.data);
    return res.data;
  }
);

export const addMemberToRoom = createAsyncThunk<Room[], { token: string; userId: number; roomId: number }>(
  "room/addMemberToRoom",
  async ({ token, userId, roomId }) => {
    const res = await axios.put<Room[]>(
      `${apiUrl}/users/${userId}/belonging-rooms/add/${roomId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  }
);

export const removeMemberFromRoom = createAsyncThunk<Room[], { token: string; userId: number; roomId: number }>(
  "room/removeMemberFromRoom",
  async ({ token, userId, roomId }) => {
    const res = await axios.put<Room[]>(
      `${apiUrl}/users/${userId}/belonging-rooms/remove/${roomId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  }
);

export const deleteRoom = createAsyncThunk<Room, { token: string; roomId: number }>("room/deleteRoom", async ({ token, roomId }) => {
  const res = await axios.delete<Room>(`${apiUrl}/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
});

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    changeLocation(state, action: PayloadAction<Location>) {
      state.location = action.payload;
    },
    joinRoom: (state, action: PayloadAction<{ roomId: string }>) => {
      console.log("join room");
    },
    leaveRoom: (state, action: PayloadAction<{ roomId: string }>) => {
      console.log("leave room");
    },
    toggleRoomMemberDrawer: (state, action: PayloadAction<{ open: boolean }>) => {
      state.isRoomMemberDrawerOpen = action.payload.open;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRoom.fulfilled, (state, action: PayloadAction<Room>) => {
      const newRoom = action.payload;
      state.belongingRooms.byIds[newRoom.id] = newRoom;
      state.belongingRooms.allIds.push(newRoom.id.toString());
    });
    builder.addCase(updateRoom.fulfilled, (state, action: PayloadAction<Room>) => {
      const updatedRoom = action.payload;
      console.log("updated room: ", updatedRoom);
      // Reflesh belongingRooms and currentRoom state.
      state.belongingRooms.byIds[updatedRoom.id] = updatedRoom;
      state.currentRoom.entity.name = updatedRoom.name;
      state.currentRoom.entity.description = updatedRoom.description;
    });
    builder.addCase(fetchAsyncGetBelongingRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      const normalizedBelongingRoomsData = normalizeBelongingRooms(action.payload);
      if (normalizedBelongingRoomsData.entities.belongingRooms !== undefined) {
        state.belongingRooms.byIds = normalizedBelongingRoomsData.entities.belongingRooms;
        state.belongingRooms.allIds = normalizedBelongingRoomsData.result.belongingRooms;
      }
    });
    builder.addCase(fetchRoomContent.pending, (state) => {
      console.log("room content pending...");
      state.currentRoom.loading = "pending";
    });
    builder.addCase(fetchRoomContent.fulfilled, (state, action: PayloadAction<NormalizedRoomContent>) => {
      const data = action.payload;
      // Do not monitor message referenses in currentRoom state.
      const currentRoom: CurrentRoom = {
        entity: {
          id: data.result.id,
          name: data.result.name,
          description: data.result.description,
          avatar: data.result.avatar,
          owners: data.result.owners,
          members: data.result.members,
          createdAt: data.result.createdAt,
          updatedAt: data.result.updatedAt,
          deletedAt: data.result.deletedAt,
        },
        loading: "idle",
      };
      state.currentRoom = currentRoom;
    });
    builder.addCase(fetchRoomContent.rejected, (state, action) => {
      console.log("fetch room content rejected.");
      console.log(action.payload?.errorMessage);
      state.currentRoom.loading = "failed";
    });
    builder.addCase(searchAsyncRooms.fulfilled, (state, action: PayloadAction<SearchedRoom[]>) => {
      const rooms = action.payload;

      // console.log("searched rooms: ", rooms);

      const searchedRoomEntity = new schema.Entity<SearchedRoom>("searchedRooms");
      const searchedRoomSchema = { searchedRooms: [searchedRoomEntity] };
      const normalizedSearchedRoomsData = normalize({ searchedRooms: rooms }, searchedRoomSchema);

      // console.log('normalized searched rooms: ', normalizedSearchedRoomsData);

      if (normalizedSearchedRoomsData.entities.searchedRooms) {
        state.searchedRooms.byIds = normalizedSearchedRoomsData.entities.searchedRooms;
        state.searchedRooms.allIds = normalizedSearchedRoomsData.result.searchedRooms;
      } else {
        state.searchedRooms.byIds = initialState.searchedRooms.byIds;
        state.searchedRooms.allIds = initialState.searchedRooms.allIds;
      }
    });
    builder.addCase(addMemberToRoom.fulfilled, (state, action: PayloadAction<Room[]>) => {
      const normalizedBelongingRoomsData = normalizeBelongingRooms(action.payload);
      if (normalizedBelongingRoomsData.entities.belongingRooms !== undefined) {
        state.belongingRooms.byIds = normalizedBelongingRoomsData.entities.belongingRooms;
        state.belongingRooms.allIds = normalizedBelongingRoomsData.result.belongingRooms;
      }
    });
    builder.addCase(removeMemberFromRoom.fulfilled, (state, action: PayloadAction<Room[]>) => {
      const normalizedBelongingRoomsData = normalizeBelongingRooms(action.payload);
      if (normalizedBelongingRoomsData.entities.belongingRooms !== undefined) {
        state.belongingRooms.byIds = normalizedBelongingRoomsData.entities.belongingRooms;
        state.belongingRooms.allIds = normalizedBelongingRoomsData.result.belongingRooms;
      }
    });
  },
});

export const roomActions = roomSlice.actions;

export const selectBelongingRooms = (state: RootState) => state.room.belongingRooms;
export const selectCurrentRoom = (state: RootState) => state.room.currentRoom;
export const selectCurrentRoomLoading = (state: RootState) => state.room.currentRoom.loading;
export const selectSearchedrooms = (state: RootState) => state.room.searchedRooms;
export const selectLocation = (state: RootState) => state.room.location;
export const selectIsRoomMemberDrawerOpen = (state: RootState) => state.room.isRoomMemberDrawerOpen;

export const roomReducer = roomSlice.reducer;
