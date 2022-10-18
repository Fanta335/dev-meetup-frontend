import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setColorMode(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
    },
  },
});

export const { toggleColorMode, setColorMode } = themeSlice.actions;

export const selectColorMode = (state: RootState) => state.theme.mode;

export const themeReducer = themeSlice.reducer;
