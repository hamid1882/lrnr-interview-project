import { configureStore } from "@reduxjs/toolkit";
import EditorSlice from "../Features/EditorSlice";

const store = configureStore({
  reducer: {
    EditorSlice,
  },
});

export default store;
