import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { roomReducer } from "../features/room/roomSlice";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppTunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
