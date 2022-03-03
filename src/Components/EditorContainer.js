import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "draft-js/dist/Draft.css";
import {
  selectCurrentId,
  selectAllDocuments,
  renameFileValue,
  addNewFile,
} from "../Features/EditorSlice";

const EditorContainer = ({ currentTheme }) => {
  const dispatch = useDispatch();

  const allDocuments = useSelector(selectAllDocuments);
  const allId = useSelector(selectCurrentId);

  const containerId = allId.toString().charAt(0);
  const LeafId = allId.toString().charAt(2);

  // id's of container and leaf elements
  const lastCollection = allDocuments.length - 1;
  const lastLeaf = allDocuments[lastCollection].leaf.length - 1;
  const lastLeafId = allDocuments[lastCollection].leaf[lastLeaf].nodeId;
  const incrementer = lastLeafId + 0.1;
  const onlyTwo = incrementer.toFixed(1);

  const containerIf =
    allDocuments[Number(containerId - 1)] === undefined
      ? "No Files Choosen"
      : allDocuments[Number(containerId) - 1].label;

  const conditionedLeaf = Number(LeafId) > 0 ? Number(LeafId) - 1 : 0;

  const leafIf =
    allDocuments[Number(containerId - 1)] !== undefined &&
    allDocuments[Number(containerId - 1)].leaf[Number(LeafId) - 1] !==
      undefined &&
    allId.toString().includes(".")
      ? allDocuments[Number(containerId - 1)].leaf[conditionedLeaf]
      : "";

  const renderMyValue = leafIf.value === undefined ? "" : leafIf.value;

  const [currentText, setCurrentText] = useState(renderMyValue);

  useEffect(() => {
    setCurrentText(renderMyValue);
  }, [renderMyValue]);

  const newFile = {
    nodeId: Number(onlyTwo),
    label: `WYSIWYG ${
      Number(containerId) + "." + allDocuments[lastCollection].leaf.length
    }`,
    value: currentText,
  };
  const [isSaved, setIsSaved] = useState(false);

  const saveAsNewFile = () => {
    dispatch(
      addNewFile({
        id: Number(containerId) - 1,
        addFile: newFile,
      })
    );
  };

  const handleUpdateValue = () => {
    dispatch(
      renameFileValue({
        id: Number(containerId - 1),
        leafId: Number(LeafId - 1),
        value: currentText,
      })
    );
    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(false);
  }, [currentText]);

  return (
    <div
      className={`container mx-auto editor-width h-100 p-2 mx-3 ${
        currentTheme ? "border-secondary" : "null"
      }`}
    >
      <h3 className="text-center mx-auto">WYSIWYG Editor</h3>

      <div className="d-flex justify-content-between align-items-center py-1">
        <div className={`files-tracker d-flex align-items-center gap-2 `}>
          <span className="text-truncate">{containerIf}</span>
          <i className={`fa fa-angle-right `}></i>
          <span className="text-truncate leaf-tracker mx-1">
            {leafIf.label}
          </span>
        </div>
        <div className="d-flex gap-2 mx-5 save-btn">
          <button
            className={`btn btn-success shadow-none ${
              currentText.length > 0 && isSaved === false && Number(LeafId)
                ? "d-flex"
                : "d-none"
            }`}
            onClick={handleUpdateValue}
          >
            <i className="fa fa-file"></i>
          </button>
          <button
            className={`btn shadow-none ${isSaved ? "d-flex" : "d-none"}`}
          >
            <i
              className={`fa fa-check ${
                currentTheme ? "text-light" : "text-dark"
              }`}
            ></i>
          </button>
          <button
            className={`btn btn-warning shadow-none  ${
              Number(containerId) >= 1 && currentText.length > 0 && allId
                ? "d-flex"
                : "d-none"
            }`}
            onClick={saveAsNewFile}
          >
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>

      <div
        className={`container mx-auto editor-input editor ${
          currentTheme ? "dark-mode" : "light-mode"
        }`}
      >
        <textarea
          className={`textarea-custom-styles ${
            currentTheme ? "dark-mode" : "light-mode"
          }`}
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Write something!"
        ></textarea>
      </div>
    </div>
  );
};

export default EditorContainer;
