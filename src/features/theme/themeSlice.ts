import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../stores/store';
import { ThemeType } from './types';
import { parsePreferDarkmode } from './utils/parsePreferDarkmode';

const preferDarkMode = localStorage.getItem('darkMode');
const initialState: ThemeType = {
  isDarkMode: preferDarkMode ? parsePreferDarkmode(preferDarkMode) : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleColorMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setColorMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleColorMode, setColorMode } = themeSlice.actions;

export const selectIsDarkMode = (state: RootState) => {
  return state.theme.isDarkMode;
};

export const themeReducer = themeSlice.reducer;
