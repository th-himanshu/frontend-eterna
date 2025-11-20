import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import tokenTableReducer from "./slices/tokenTableSlice";
import liveUpdatesReducer from "./slices/liveUpdatesSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tokenTable: tokenTableReducer,
    liveUpdates: liveUpdatesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
