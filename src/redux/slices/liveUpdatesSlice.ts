import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LiveUpdatesState {
  isConnected: boolean;
  updateIntervalMs: number;
  lastUpdateAt: number | null;
}

const initialState: LiveUpdatesState = {
  isConnected: false,
  updateIntervalMs: 2_000,
  lastUpdateAt: null,
};

const liveUpdatesSlice = createSlice({
  name: "liveUpdates",
  initialState,
  reducers: {
    connect(state) {
      state.isConnected = true;
    },
    disconnect(state) {
      state.isConnected = false;
    },
    setUpdateInterval(state, action: PayloadAction<number>) {
      state.updateIntervalMs = action.payload;
    },
    setLastUpdateAt(state, action: PayloadAction<number | null>) {
      state.lastUpdateAt = action.payload;
    },
  },
});

export const { connect, disconnect, setUpdateInterval, setLastUpdateAt } =
  liveUpdatesSlice.actions;

export default liveUpdatesSlice.reducer;
