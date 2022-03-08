import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentId, addNewFile } from "../Features/EditorSlice";
import Carousel from "./Carousel";
import UserGuide from "./UserGuide";
import EditorContainerCustomFunctions from "./EditorContainerCustomFunctions";

const EditorContainer = ({ currentTheme }) => {
  const dispatch = useDispatch();
  const selectedNodeId = useSelector(selectCurrentId);

  const {
    containerId,
    leafId,
    currentCollection,
    currentLeaf,
    onlyTwo,
    currentDataType,
    currentText,
    setCurrentText,
    isSaved,
    setIsSaved,
    saveAsNewFile,
    handleUpdateValue,
    handleChangeType,
  } = EditorContainerCustomFunctions();

  const [isHover, setIsHover] = useState(false);
  const [isHoverUpdate, setIsHoverUpdate] = useState(false);

  const tooltipRef = useRef();

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
    // eslint-disable-next-line
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
          <span className="text-truncate">{currentCollection}</span>
          <i
            className={`fa fa-angle-right ${
              currentLeaf.label === undefined ? "d-none" : "d-flex"
            }`}
          ></i>
          <span className="text-truncate leaf-tracker mx-1">
            {currentLeaf.label}
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
              currentText.length > 0 && isSaved === false && Number(leafId)
                ? "d-flex"
                : "d-none"
            }`}
            onClick={handleUpdateValue}
            onMouseOver={handleToolTip}
            onMouseOut={handleToolTipOut}
            ref={tooltipRef}
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
              Number(containerId) >= 1 &&
              currentText.length > 0 &&
              selectedNodeId
                ? "d-flex"
                : "d-none"
            }`}
            onClick={saveAsNewFile}
            onMouseOver={handleToolTip}
            onMouseOut={handleToolTipOut}
            ref={tooltipRef}
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
            currentCollection === "Choose Collection"
              ? "open-editor-menu"
              : "collapse-editor-menu"
          }`}
        >
          <h4 className="text-start text-md-center fs-4 fs-md-1">
            🎉🎊Welcome to My Editor🎉🎊
          </h4>
          <h5>Choose a Collection to Get Started </h5>
          <Carousel />
          <UserGuide />
        </div>
        {/* Add new files */}
        <div
          className={`welcome-container container  p-2 ${
            currentCollection !== "Choose Collection" &&
            currentLeaf.value === undefined
              ? "open-editor-menu"
              : "collapse-editor-menu"
          }`}
        >
          <h3>Create a New File</h3>
          <div className="my-4 row justify-content-start">
            <div className="p-2 my-1">
              <h5>File Name</h5>
              <input
                className={`input-custom-styles border rounded ${
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
                className={`input-custom-styles border rounded ${
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
                className={`w-100 input-custom-styles file-input-styles border rounded ${
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
          } ${
            currentLeaf.type === "text"
              ? "open-editor-menu"
              : "collapse-editor-menu"
          }`}
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Write something!"
        ></textarea>
        {/* Image editor */}
        <div
          className={`${
            currentLeaf.type === "image"
              ? "open-editor-menu"
              : "collapse-editor-menu"
          } container d-flex justify-content-center align-items-center my-1 p-2`}
        >
          <img
            className="img-responsive img-fluid shadow rounded"
            src={currentLeaf.value}
            alt={currentLeaf.label}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;
