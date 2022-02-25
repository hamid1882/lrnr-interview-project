import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  currentValue: 1,
};

const EditorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    changeCurrentValue: (state, action) => {
      state.currentValue = state.currentValue + action;
    },
  },
});

export const { changeCurrentValue } = EditorSlice.actions;

export const selectCurrentValue = (state) => state.EditorSlice.currentValue;

export default EditorSlice.reducer;
