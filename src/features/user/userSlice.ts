import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../stores/store';
import { addOwnerToRoom, fetchRoomContent, removeOwnerToRoom } from '../room/roomSlice';
import { NormalizedRoomContent, Room } from '../room/types';
import { normalizeRoomMembers } from './libs/normalizr/normalizeRoomMembers';
import { UpdateRootUserDTO, UpdateUserDTO, User, UserType } from './types';

const apiUrl = process.env.REACT_APP_API_URL;
const initialState: UserType = {
  currentUser: {
    id: 0,
    name: '',
    email: '',
    description: '',
    avatar: {
      id: 0,
      key: '',
      url: '',
    },
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  },
  currentUsers: {
    members: {
      byIds: {
        '0': {
          id: 0,
          name: '',
          description: '',
          avatar: {
            id: 0,
            key: '',
            url: '',
          },
          createdAt: '',
          updatedAt: '',
          deletedAt: null,
        },
      },
      allIds: [0],
    },
    owners: [0],
  },
};

export const fetchAllUsers = createAsyncThunk<User[], { token: string }>(
  'user/fetchAllUsers',
  async ({ token }) => {
    const res = await axios.get<User[]>(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const fetchUserProfile = createAsyncThunk<User, { token: string }>(
  'user/fetchUserProfile',
  async ({ token }) => {
    const res = await axios.get<User>(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const updateUserProfile = createAsyncThunk<
  User,
  { token: string; updateUserDTO: UpdateUserDTO }
>('user/updateUserProfile', async ({ token, updateUserDTO }) => {
  const res = await axios.patch<User>(`${apiUrl}/users/me`, updateUserDTO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

export const updateUserAvatar = createAsyncThunk<User, { token: string; formData: FormData }>(
  'user/updateUserAvatar',
  async ({ token, formData }) => {
    const res = await axios.post<User>(`${apiUrl}/users/me/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const updateRootUserProfile = createAsyncThunk<
  User,
  { token: string; updateRootUserDTO: UpdateRootUserDTO }
>('user/updateRootUserProfile', async ({ token, updateRootUserDTO: updateUserDTO }) => {
  const res = await axios.patch<User>(`${apiUrl}/users/me/root`, updateUserDTO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

export const deleteUser = createAsyncThunk<void, { token: string; userId: string }>(
  'user/deleteUser',
  ({ token, userId }) => {
    axios.delete(`${apiUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    syncCurrentUsersWithServer(state, action: PayloadAction<User[]>) {
      const normalizedRoomMembers = normalizeRoomMembers(action.payload);
      if (normalizedRoomMembers.entities.members !== undefined) {
        state.currentUsers.members.byIds = normalizedRoomMembers.entities.members;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        state.currentUsers.members.allIds = normalizedRoomMembers.result.members;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    });
    builder.addCase(
      fetchRoomContent.fulfilled,
      (state, action: PayloadAction<NormalizedRoomContent>) => {
        const data = action.payload;
        state.currentUsers.members.byIds = data.entities.members;
        state.currentUsers.members.allIds = data.result.members;
        state.currentUsers.owners = data.result.owners;
      }
    );
    builder.addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      console.log(action.payload);
    });
    builder.addCase(updateUserAvatar.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    });
    builder.addCase(updateRootUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    });
    builder.addCase(
      addOwnerToRoom.fulfilled,
      (state, action: PayloadAction<Room & { owners: User[] }>) => {
        state.currentUsers.owners = action.payload.owners.map((owner) => {
          return owner.id;
        });
      }
    );
    builder.addCase(
      removeOwnerToRoom.fulfilled,
      (state, action: PayloadAction<Room & { owners: User[] }>) => {
        state.currentUsers.owners = action.payload.owners.map((owner) => {
          return owner.id;
        });
      }
    );
  },
});

export const { syncCurrentUsersWithServer } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => {
  return state.user.currentUser;
};
export const selectCurrentUsers = (state: RootState) => {
  return state.user.currentUsers;
};

export const userReducer = userSlice.reducer;
