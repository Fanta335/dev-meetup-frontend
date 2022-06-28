import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../stores/store";
import { fetchRoomContent } from "../room/roomSlice";
import { NormalizedRoomContent } from "../room/types";
import { normalizeRoomMembers } from "./libs/normalizr/normalizeRoomMembers";
import { User, UserType } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: UserType = {
  currentUser: {
    id: 0,
    name: "",
    email: "",
    avatar: {
      id: 0,
      key: "",
      url: "",
    },
    createdAt: "",
    updatedAt: "",
    deletedAt: null,
  },
  currentUsers: {
    members: {
      byIds: {
        "0": {
          id: 0,
          name: "",
          avatar: {
            id: 0,
            key: "",
            url: "",
          },
          createdAt: "",
          updatedAt: "",
          deletedAt: null,
        },
      },
      allIds: [0],
    },
    owners: [0],
  },
};

export const fetchAllUsers = createAsyncThunk<User[], { token: string }>("user/fetchAllUsers", async ({ token }) => {
  const res = await axios.get(`${apiUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

export const fetchUserProfile = createAsyncThunk<User, { token: string }>("user/fetchUserProfile", async ({ token }) => {
  const res = await axios.get(`${apiUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    syncCurrentUsersWithServer(state, action: PayloadAction<User[]>) {
      const normalizedRoomMembers = normalizeRoomMembers(action.payload);
      if (normalizedRoomMembers.entities.members !== undefined) {
        state.currentUsers.members.byIds = normalizedRoomMembers.entities.members;
        state.currentUsers.members.allIds = normalizedRoomMembers.result.members;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    });
    builder.addCase(fetchRoomContent.fulfilled, (state, action: PayloadAction<NormalizedRoomContent>) => {
      const data = action.payload;
      state.currentUsers.members.byIds = data.entities.members;
      state.currentUsers.members.allIds = data.result.members;
      state.currentUsers.owners = data.result.owners;
    });
  },
});

export const { syncCurrentUsersWithServer } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectCurrentUsers = (state: RootState) => state.user.currentUsers;

export const userReducer = userSlice.reducer;
