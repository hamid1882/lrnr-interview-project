import { createSlice } from "@reduxjs/toolkit";
import { allDocuments } from "./dataSchema";

export const initialState = {
  documents: allDocuments,
  isDarkMode: false,
  currentText: "",
  currentId: 0,
};

const EditorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    currentEditorText: (state, action) => {
      state.currentText = action.payload;
    },
    renderCurrentContainer: (state, action) => {
      state.currentId = action.payload;
    },
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
    renameSingleFile: (state, action) => {
      state.documents[action.payload.id].leaf[action.payload.leafId].label =
        action.payload.name;
    },
    renameFileValue: (state, action) => {
      state.documents[action.payload.id].leaf[action.payload.leafId].value =
        action.payload.value;
    },
    changeFileType: (state, action) => {
      state.documents[action.payload.id].leaf[action.payload.leafId].type =
        action.payload.type;
    },
    toggleDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const {
  currentEditorText,
  renderCurrentContainer,
  showAllDocument,
  addNewCollection,
  renameCollection,
  changeFileType,
  addNewFile,
  deleteCollection,
  deleteSingleFile,
  renameSingleFile,
  toggleDarkMode,
  renameFileValue,
} = EditorSlice.actions;

// Selectors

export const selectCurrentEditorText = (state) => state.EditorSlice.currentText;
export const selectAllDocuments = (state) => state.EditorSlice.documents;
export const selectCurrentTheme = (state) => state.EditorSlice.isDarkMode;
export const selectCurrentId = (state) => state.EditorSlice.currentId;

export default EditorSlice.reducer;
