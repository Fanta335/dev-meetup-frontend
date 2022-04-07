import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../stores/store";
import { User } from "./types";

const apiUrl = process.env.REACT_APP_SERVER_URL;
const initialState: { users: User[] } = {
  users: [
    {
      id: 0,
      subId: "",
      name: "",
      email: "",
      createdAt: "",
      updatedAt: "",
    },
  ],
};

export const fetchAllUsers = createAsyncThunk<User[], { token: string }>("user/fetchAllUsers", async ({ token }) => {
  const res = await axios.get(`${apiUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.user.users;

export const userReducer = userSlice.reducer;
