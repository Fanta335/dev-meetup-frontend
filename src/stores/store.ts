import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { chatMiddleware } from "../features/message/chatMiddleware";
import { messageReducer } from "../features/message/messageSlice";
import { roomReducer } from "../features/room/roomSlice";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    message: messageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([chatMiddleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppTunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export type AsyncThunkConfig<T = unknown> = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: T;
}
