import { createSlice } from "@reduxjs/toolkit";

const allDocuments = [
  {
    name: "container-node",
    nodeId: "Collection 1",
    label: "Collection 1",
    id: 1,
    leaf: [
      {
        nodeId: "File 1",
        label: "File 1",
        id: 1,
      },
    ],
  },
];

export const initialState = {
  documents: allDocuments,
};

const EditorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    showAllDocument: (state, action) => {
      return state.documents;
    },
    addNewCollection: (state, action) => {
      state.documents = state.documents.concat(action.payload);
    },
    addNewFile: (state, action) => {
      // state.files = state.files.concat(action.payload);
    },
  },
});

export const { showAllDocument, addNewCollection, addNewFile } =
  EditorSlice.actions;

export const selectAllDocuments = (state) => state.EditorSlice.documents;

export default EditorSlice.reducer;
