import { createSlice } from "@reduxjs/toolkit";

const allDocuments = [
  {
    name: "container-node",
    nodeId: 1,
    label: "Collection 1",
    leaf: [
      {
        nodeId: 1.1,
        label: `Collection 1.1`,
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
      state.documents[0].leaf.push(action.payload);
      state.documents = state.documents;
    },
  },
});

export const { showAllDocument, addNewCollection, addNewFile } =
  EditorSlice.actions;

export const selectAllDocuments = (state) => state.EditorSlice.documents;

export default EditorSlice.reducer;
