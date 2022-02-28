import { createSlice } from "@reduxjs/toolkit";

const allDocuments = [
  {
    name: "container-node",
    nodeId: 1,
    label: "Collection 1",
    id: 1,
    leaf: [
      {
        nodeId: 1.1,
        label: "File 1.1",
        id: 1,
      },
      {
        nodeId: 1.2,
        label: "File 1.2",
        id: 2,
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
    renameCollection: (state, action) => {
      state.documents[action.payload.id].label = action.payload.newName;
    },
    addNewFile: (state, action) => {
      state.documents[action.payload.id].leaf.push(action.payload.addFile);
    },
    deleteSingleFile: (state, action) => {
      const mappedLeaf = state.documents[action.payload.id].leaf.filter(
        (val) => val.nodeId !== action.payload.currentFile
      );
      state.documents[action.payload.id].leaf = mappedLeaf;
    },
  },
});

export const {
  showAllDocument,
  addNewCollection,
  renameCollection,
  addNewFile,
  deleteCollection,
  deleteSingleFile,
} = EditorSlice.actions;

export const selectAllDocuments = (state) => state.EditorSlice.documents;

export default EditorSlice.reducer;
