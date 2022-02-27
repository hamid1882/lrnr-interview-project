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
    deleteCollection: (state, action) => {
      const filteredDoc = state.documents.filter(
        (docs) => docs.id !== action.payload
      );
      state.documents = filteredDoc;
    },
    addNewFile: (state, action) => {
      state.documents[action.payload.id].leaf.push(action.payload.addFile);
    },
  },
});

export const {
  showAllDocument,
  addNewCollection,
  addNewFile,
  deleteCollection,
} = EditorSlice.actions;

export const selectAllDocuments = (state) => state.EditorSlice.documents;

export default EditorSlice.reducer;
