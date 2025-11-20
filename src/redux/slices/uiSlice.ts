import { createSlice } from "@reduxjs/toolkit";

type UiState = Record<string, never>;

const initialState: UiState = {};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export default uiSlice.reducer;

