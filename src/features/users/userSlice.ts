import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../stores/store";
import { User } from "./types";

const apiUrl = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("access_token");
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

export const fetchAsyncGetUsers = createAsyncThunk("user/get", async () => {
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
    builder.addCase(fetchAsyncGetUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users;

export const userReducer = userSlice.reducer;
