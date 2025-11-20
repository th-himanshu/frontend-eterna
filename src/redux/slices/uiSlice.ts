import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PresetId = "P1" | "P2" | "P3";

interface UiState {
  activePreset: PresetId;
}

const initialState: UiState = {
  activePreset: "P1",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActivePreset(state, action: PayloadAction<PresetId>) {
      state.activePreset = action.payload;
    },
  },
});

export const { setActivePreset } = uiSlice.actions;
export default uiSlice.reducer;
