import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";
import { ThemeType } from "./types";

const initialState: ThemeType = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleColorMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleColorMode } = themeSlice.actions;

export const selectColorMode = (state: RootState) => state.theme.mode;

export const themeReducer = themeSlice.reducer;
