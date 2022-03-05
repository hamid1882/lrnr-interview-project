import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentId,
  selectAllDocuments,
  renameFileValue,
  addNewFile,
  changeFileType,
} from "../Features/EditorSlice";
import UserGuide from "./UserGuide";

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
      ? "Choose Collection"
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

  const checkLeafIf = leafIf.value === undefined ? "text" : leafIf.value;
  const currentDataType = checkLeafIf.includes(".jpg") ? "image" : "text";

  const newFile = {
    nodeId: Number(onlyTwo),
    label: `WYSIWYG ${
      Number(containerId) + "." + allDocuments[lastCollection].leaf.length
    }`,
    value: currentText,
    type: currentDataType,
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
        type: currentDataType,
      })
    );
    setIsSaved(true);
  };

  const handleChangeType = () => {
    dispatch(
      changeFileType({
        id: Number(containerId - 1),
        leafId: Number(LeafId - 1),
        type: currentDataType,
      })
    );
  };

  const [isHover, setIsHover] = useState(false);
  const [isHoverUpdate, setIsHoverUpdate] = useState(false);

  const tooltipRif = useRef();

  const handleToolTip = (e) => {
    if (e.target.id === "save") {
      setIsHover(true);
    }
    if (e.target.id === "update") {
      setIsHoverUpdate(true);
    }
  };

  const handleToolTipOut = () => {
    setIsHover(false);
    setIsHoverUpdate(false);
  };

  useEffect(() => {
    setIsSaved(false);
  }, [currentText]);

  // Create a new files

  const [newFileName, setNewFileName] = useState("");
  const [newFileType, setNewFileType] = useState("text");
  const [newFileInput, setNewFileInput] = useState("");

  const newFileSchema = {
    nodeId: Number(onlyTwo),
    label: newFileName,
    value: newFileInput,
    type: newFileType,
  };

  const handleCreateNewFile = () => {
    if (
      (newFileName !== "" &&
        newFileType !== "" &&
        newFileInput !== "" &&
        newFileType === "text") ||
      newFileType === "image"
    ) {
      dispatch(
        addNewFile({
          id: Number(containerId) - 1,
          addFile: newFileSchema,
        })
      );
    }
    setNewFileName("");
    setNewFileType("");
    setNewFileInput("");
  };

  return (
    <div
      className={`container mx-auto editor-width h-100 p-2 mx-3 border-editor ${
        currentTheme ? "border-secondary" : "null"
      }`}
    >
      <h1 className="text-center mx-auto welcome-container">Files-Explorer</h1>

      <div className="d-flex justify-content-between align-items-center py-1 my-1">
        <div className={`files-tracker d-flex align-items-center gap-2 `}>
          <span className="text-truncate">{containerIf}</span>
          <i
            className={`fa fa-angle-right ${
              leafIf.label === undefined ? "d-none" : "d-flex"
            }`}
          ></i>
          <span className="text-truncate leaf-tracker mx-1">
            {leafIf.label}
          </span>
        </div>
        <div className="d-flex gap-2 mx-5 save-btn">
          <button
            className={`btn btn-danger shadow-none ${
              currentDataType === "image" ? "d-flex" : "d-none"
            }`}
            onClick={handleChangeType}
          >
            <i className="fa fa-file-picture-o"></i>
          </button>
          <button
            className={`btn btn-success shadow-none ${
              currentText.length > 0 && isSaved === false && Number(LeafId)
                ? "d-flex"
                : "d-none"
            }`}
            onClick={handleUpdateValue}
            onMouseOver={handleToolTip}
            onMouseOut={handleToolTipOut}
            ref={tooltipRif}
            id="save"
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
            onMouseOver={handleToolTip}
            onMouseOut={handleToolTipOut}
            ref={tooltipRif}
            id="update"
          >
            <i className="fa fa-plus"></i>
          </button>
          <div
            className={`${isHover ? "d-block" : "d-none"} tooltip-custom-style`}
          >
            Update and save file
            <div className="tooltip-shape"> </div>
          </div>
          <div
            className={`${
              isHoverUpdate ? "d-block" : "d-none"
            } tooltip-custom-style`}
          >
            Save in a New File
            <div className="tooltip-shape-update"> </div>
          </div>
        </div>
      </div>

      <div
        className={`container mx-auto editor-input editor ${
          currentTheme ? "dark-mode" : "light-mode"
        }`}
      >
        {/* Welcome home page */}
        <div
          className={`container p-2 my-1 mx-auto text-center welcome-container ${
            containerIf === "Choose Collection" ? "d-block" : "d-none"
          }`}
        >
          <h1>🎉🎊Welcome to My Editor🎉🎊</h1>
          <h5>Choose a Collection to Get Started </h5>
          <UserGuide />
        </div>
        {/* Add new files */}
        <div
          className={`welcome-container container  p-2 ${
            containerIf !== "Choose Collection" && leafIf.value === undefined
              ? "d-block"
              : "d-none"
          }`}
        >
          <h3>Create a New File</h3>
          <div className="my-4 row justify-content-start">
            <div className="p-2 my-1">
              <h5>File Name</h5>
              <input
                className={`input-custom-styles ${
                  currentTheme ? "dark-mode" : "light-mode"
                }`}
                type="text"
                placeholder="Enter File Name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
              ></input>
            </div>
            <div className="p-2 my-1">
              <h5>File Type</h5>
              <details className="text-secondary">
                <summary>Available types</summary>
                text/image
              </details>
              <input
                className={`input-custom-styles ${
                  currentTheme ? "dark-mode" : "light-mode"
                }`}
                type="text"
                placeholder="Enter text/image"
                value={newFileType}
                onChange={(e) => setNewFileType(e.target.value)}
              ></input>
            </div>
            <div className="p-2 my-1">
              <h5>File Input</h5>
              <details className="text-secondary">
                <summary>Available image extentions</summary>
                .jpg .png
              </details>
              <textarea
                className={`w-100 input-custom-styles file-input-styles ${
                  currentTheme ? "dark-mode" : "light-mode"
                }`}
                type="link"
                placeholder="Enter text/image-link"
                value={newFileInput}
                onChange={(e) => setNewFileInput(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            onClick={handleCreateNewFile}
            className="btn btn-success shadow-none"
          >
            Create File
          </button>
        </div>
        {/* text editor */}
        <textarea
          className={`textarea-custom-styles ${
            currentTheme ? "dark-mode" : "light-mode"
          } ${leafIf.type === "text" ? "d-block" : "d-none"}`}
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Write something!"
        ></textarea>
        {/* Image editor */}
        <div
          className={`${
            leafIf.type === "image" ? "d-block" : "d-none"
          } container d-flex justify-content-center align-items-center my-1 p-2`}
        >
          <img
            className="img-responsive img-fluid shadow rounded"
            src={leafIf.value}
            alt={leafIf.label}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;
