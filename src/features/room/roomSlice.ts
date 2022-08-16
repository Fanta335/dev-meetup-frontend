import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize, schema } from "normalizr";
import { AsyncThunkConfig, RootState } from "../../stores/store";
import { Room, CurrentRoom, RoomContent, NormalizedRoomContent, Location, RoomType, SearchedRoom, Invitation, UpdateRoomDTO } from "../room/types";
import { User } from "../user/types";
import { normalizeBelongingRooms } from "./libs/normalizr/normalizeBelongingRooms";

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: RoomType = {
  belongingRooms: {
    byIds: {},
    allIds: [],
  },
  ownRooms: {
    allIds: [],
  },
  currentRoom: {
    entity: {
      id: 0,
      name: "",
      description: "",
      isPrivate: false,
      avatar: {
        id: 0,
        key: "",
        url: "",
      },
      createdAt: "",
      updatedAt: "",
      deletedAt: null,
      tags: [],
      owners: [],
      members: [],
    },
    loading: "idle",
  },
  searchedRooms: {
    byIds: {},
    allIds: [],
    count: 0,
  },
  location: "discovery",
  isRoomMemberDrawerOpen: false,
  roomAvatarPreviewUrl: null,
  invitation: null,
};

export const postRoom = createAsyncThunk<Room, { token: string; formData: FormData }>("room/postRoom", async ({ token, formData }) => {
  const res = await axios.post(`${apiUrl}/rooms`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
});

export const updateRoom = createAsyncThunk<Room, { token: string; roomId: number; updateRoomDTO: UpdateRoomDTO }>(
  "room/updateRoom",
  async ({ token, roomId, updateRoomDTO }) => {
    const res = await axios.patch(`${apiUrl}/rooms/${roomId}`, updateRoomDTO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
);

export const postRoomAvatar = createAsyncThunk<Room, { token: string; roomId: number; formData: FormData }>(
  "room/postRoomAvatar",
  async ({ token, roomId, formData }) => {
    const res = await axios.post(`${apiUrl}/rooms/${roomId}/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
);

export const fetchBelongingRooms = createAsyncThunk<Room[], { token: string }>("room/fetchBelongingRooms", async ({ token }) => {
  const res = await axios.get<Room[]>(`${apiUrl}/users/me/belonging-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("fetch belonging rooms: ", res.data);
  return res.data;
});

export const fetchOwnRooms = createAsyncThunk<Room[], { token: string; userId: string }>("room/fetchOwnRooms", async ({ token, userId }) => {
  const res = await axios.get<Room[]>(`${apiUrl}/users/${userId}/own-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("fetch own rooms: ", res.data);
  return res.data;
});

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

export const searchAsyncRooms = createAsyncThunk<{ data: SearchedRoom[]; count: number }, { token: string; searchParams: string }>(
  "room/search-rooms",
  async ({ token, searchParams }) => {
    const res = await axios.get<{ data: SearchedRoom[]; count: number }>(`${apiUrl}/rooms/search?${searchParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("searched rooms: ", res.data);
    return res.data;
  }
);

export const addMemberToRoom = createAsyncThunk<Room, { token: string; roomId: number }>("room/addMemberToRoom", async ({ token, roomId }) => {
  const res = await axios.patch<Room>(
    `${apiUrl}/rooms/${roomId}/members/add`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
});

export const removeMemberFromRoom = createAsyncThunk<Room, { token: string; roomId: number }>("room/removeMemberFromRoom", async ({ token, roomId }) => {
  const res = await axios.patch<Room>(
    `${apiUrl}/rooms/${roomId}/members/remove`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
});

export const addOwnerToRoom = createAsyncThunk<Room & { owners: User[] }, { token: string; userId: number; roomId: number }>(
  "room/addOwnerToRoom",
  async ({ token, userId, roomId }) => {
    const res = await axios.patch<Room & { owners: User[] }>(
      `${apiUrl}/rooms/${roomId}/owners/add/`,
      {
        userIdToAdd: userId,
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

export const removeOwnerToRoom = createAsyncThunk<Room & { owners: User[] }, { token: string; userId: number; roomId: number }>(
  "room/removeOwnerToRoom",
  async ({ token, userId, roomId }) => {
    const res = await axios.patch<Room & { owners: User[] }>(
      `${apiUrl}/rooms/${roomId}/owners/remove/`,
      {
        userIdToRemove: userId,
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

export const deleteRoom = createAsyncThunk<Room, { token: string; roomId: number }>("room/deleteRoom", async ({ token, roomId }) => {
  const res = await axios.delete<Room>(`${apiUrl}/rooms/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
});

export const createInviteLink = createAsyncThunk<Invitation, { token: string; roomId: number; secondsExpirationLifetime: number }>(
  "room/createInvitation",
  async ({ token, roomId, secondsExpirationLifetime }) => {
    const res = await axios.post<Invitation>(
      `${apiUrl}/invite`,
      { roomId, secondsExpirationLifetime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  }
);

export const accessByInvitation = createAsyncThunk<Room, { token: string; uuid: string }>("room/accessByInvitation", async ({ token, uuid }) => {
  const res = await axios.get<Room>(`${apiUrl}/invite/${uuid}`, {
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
    setRoomAvatarPreview: (state, action: PayloadAction<{ url: string | null }>) => {
      state.roomAvatarPreviewUrl = action.payload.url;
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
      state.currentRoom.entity.isPrivate = updatedRoom.isPrivate;
    });
    builder.addCase(postRoomAvatar.fulfilled, (state, action: PayloadAction<Room>) => {
      const updatedRoom = action.payload;
      console.log("updated room: ", updatedRoom);
      // Reflesh belongingRooms and currentRoom state.
      state.belongingRooms.byIds[updatedRoom.id] = updatedRoom;
    });
    builder.addCase(fetchBelongingRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      // console.log('raw belonging rooms ', action.payload);
      const normalizedBelongingRoomsData = normalizeBelongingRooms(action.payload);
      if (normalizedBelongingRoomsData.entities.belongingRooms !== undefined) {
        state.belongingRooms.byIds = normalizedBelongingRoomsData.entities.belongingRooms;
        state.belongingRooms.allIds = normalizedBelongingRoomsData.result.belongingRooms;
      }
    });
    builder.addCase(fetchOwnRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
      // console.log("own rooms ", action.payload);
      state.ownRooms.allIds = action.payload.map((room) => room.id.toString());
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
          isPrivate: data.result.isPrivate,
          avatar: data.result.avatar,
          owners: data.result.owners,
          members: data.result.members,
          tags: data.result.tags,
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
    builder.addCase(searchAsyncRooms.fulfilled, (state, action: PayloadAction<{ data: SearchedRoom[]; count: number }>) => {
      const res = action.payload;

      // console.log("searched rooms: ", rooms);

      const searchedRoomEntity = new schema.Entity<SearchedRoom>("searchedRooms");
      const searchedRoomSchema = { searchedRooms: [searchedRoomEntity] };
      const normalizedSearchedRoomsData = normalize({ searchedRooms: res.data }, searchedRoomSchema);

      // console.log('normalized searched rooms: ', normalizedSearchedRoomsData);

      if (normalizedSearchedRoomsData.entities.searchedRooms) {
        state.searchedRooms.byIds = normalizedSearchedRoomsData.entities.searchedRooms;
        state.searchedRooms.allIds = normalizedSearchedRoomsData.result.searchedRooms;
        state.searchedRooms.count = res.count;
      } else {
        state.searchedRooms.byIds = initialState.searchedRooms.byIds;
        state.searchedRooms.allIds = initialState.searchedRooms.allIds;
        state.searchedRooms.count = initialState.searchedRooms.count;
      }
    });
    // builder.addCase(addMemberToRoom.fulfilled, (state, action: PayloadAction<Room[]>) => {
    //   const normalizedBelongingRoomsData = normalizeBelongingRooms(action.payload);
    //   if (normalizedBelongingRoomsData.entities.belongingRooms !== undefined) {
    //     state.belongingRooms.byIds = normalizedBelongingRoomsData.entities.belongingRooms;
    //     state.belongingRooms.allIds = normalizedBelongingRoomsData.result.belongingRooms;
    //   }
    // });
    // builder.addCase(removeMemberFromRoom.fulfilled, (state, action: PayloadAction<Room[]>) => {
    //   const normalizedBelongingRoomsData = normalizeBelongingRooms(action.payload);
    //   if (normalizedBelongingRoomsData.entities.belongingRooms !== undefined) {
    //     state.belongingRooms.byIds = normalizedBelongingRoomsData.entities.belongingRooms;
    //     state.belongingRooms.allIds = normalizedBelongingRoomsData.result.belongingRooms;
    //   } else {
    //     state.belongingRooms.byIds = {};
    //     state.belongingRooms.allIds = [];
    //   }
    // });
    builder.addCase(addOwnerToRoom.fulfilled, (state, action: PayloadAction<Room & { owners: User[] }>) => {
      state.currentRoom.entity.owners = action.payload.owners.map((owner) => owner.id);
    });
    builder.addCase(removeOwnerToRoom.fulfilled, (state, action: PayloadAction<Room & { owners: User[] }>) => {
      state.currentRoom.entity.owners = action.payload.owners.map((owner) => owner.id);
    });
    builder.addCase(createInviteLink.fulfilled, (state, action: PayloadAction<Invitation>) => {
      const invitation = action.payload;
      const url = process.env.REACT_APP_CLIENT_URL + "/invite/" + invitation.id;
      state.invitation = { id: invitation.id, roomId: invitation.roomId, url };
    });
  },
});

export const roomActions = roomSlice.actions;

export const selectBelongingRooms = (state: RootState) => state.room.belongingRooms;
export const selectOwnRooms = (state: RootState) => state.room.ownRooms;
export const selectCurrentRoom = (state: RootState) => state.room.currentRoom;
export const selectCurrentRoomLoading = (state: RootState) => state.room.currentRoom.loading;
export const selectSearchedrooms = (state: RootState) => state.room.searchedRooms;
export const selectLocation = (state: RootState) => state.room.location;
export const selectIsRoomMemberDrawerOpen = (state: RootState) => state.room.isRoomMemberDrawerOpen;
export const selectRoomAvatarPreviewUrl = (state: RootState) => state.room.roomAvatarPreviewUrl;
export const selectInvitation = (state: RootState) => state.room.invitation;

export const roomReducer = roomSlice.reducer;
