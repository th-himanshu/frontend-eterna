import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  // Reserved for future UI state that is global (not per-category)
}

const initialState: UiState = {};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export default uiSlice.reducer;

