import { ThunkAction, Action } from "@reduxjs/toolkit";
import store from "Store";

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type { AppDispatch, RootState, AppThunk };
