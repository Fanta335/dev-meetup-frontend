import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { messageMiddleware } from "../features/message/messageMiddleware";
import { messageReducer } from "../features/message/messageSlice";
import { roomReducer } from "../features/room/roomSlice";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    message: messageReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([messageMiddleware])
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppTunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
