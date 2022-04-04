import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { userReducer } from "../features/users/userSlice";

export const store = configureStore({ reducer: userReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppTunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
