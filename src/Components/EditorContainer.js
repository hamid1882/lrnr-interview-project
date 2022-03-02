import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import {
  currentEditorText,
  selectCurrentId,
  selectAllDocuments,
  addNewFile,
} from "../Features/EditorSlice";

const EditorContainer = ({ currentTheme }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentAligned, setCurrentAligned] = useState("left");
  const currentContent = editorState.getCurrentContent();
  const dispatch = useDispatch();

  const allDocuments = useSelector(selectAllDocuments);
  const allId = useSelector(selectCurrentId);

  const containerId = allId.toString().charAt(0);

  // id's of container and leaf elements
  const lastCollection = allDocuments.length - 1;
  const lastLeaf = allDocuments[lastCollection].leaf.length - 1;
  const lastLeafId = allDocuments[lastCollection].leaf[lastLeaf].nodeId;
  const incrementer = lastLeafId + 0.1;
  const onlyTwo = incrementer.toFixed(1);

  const newFile = {
    nodeId: Number(onlyTwo),
    label: `WYSIWYG ${
      Number(containerId) + "." + allDocuments[lastCollection].leaf.length
    }`,
    value: currentContent.getPlainText(),
  };

  const saveAsNewFile = () => {
    dispatch(
      addNewFile({
        id: Number(containerId) - 1,
        addFile: newFile,
      })
    );
    setEditorState(EditorState.createEmpty());
  };

  useEffect(() => {
    dispatch(currentEditorText(currentContent.getPlainText()));
  }, [dispatch, currentContent]);

  const editorRef = useRef();

  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const _onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };
  const _onCenterAlign = () => {
    setCurrentAligned("center");
    editorRef.current.focus();
  };
  const _onRightAlign = () => {
    setCurrentAligned("right");
    editorRef.current.focus();
  };
  const _onLeftAlign = () => {
    setCurrentAligned("left");
    editorRef.current.focus();
  };

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  // const inputValue = convertToRaw(editorState.getCurrentContent()).blocks;

  const switchTheme = currentTheme ? "dark-mode btn-hover" : "light-mode";

  return (
    <div
      className={`container mx-auto editor-width h-100 border p-2 mx-3 ${
        currentTheme ? "border-secondary" : "null"
      }`}
    >
      <div className="d-flex">
        <button
          className={`btn btn-success shadow-none ${
            currentContent.getPlainText().length > 0 && allId
              ? "d-flex"
              : "d-none"
          }`}
          onClick={saveAsNewFile}
        >
          Save
        </button>
        <h3 className="text-center mx-auto">WYSIWYG Editor</h3>
      </div>
      <div className="d-flex justify-content-start gap-2 my-2">
        <button
          onClick={_onBoldClick}
          className={`btn shadow-none btn-transparent ${switchTheme}`}
        >
          <i className="fa fa-bold"></i>
        </button>
        <button
          onClick={_onItalicClick}
          className={`btn shadow-none btn-transparent ${switchTheme}`}
        >
          <i className="fa fa-italic"></i>
        </button>
        <button
          onClick={_onUnderlineClick}
          className={`btn shadow-none btn-transparent ${switchTheme}`}
        >
          <i className="fa fa-underline"></i>
        </button>
        <button
          onClick={_onLeftAlign}
          className={`btn shadow-none btn-transparent ${switchTheme}`}
        >
          <i className="fa fa-align-left"></i>
        </button>
        <button
          onClick={_onCenterAlign}
          className={`btn shadow-none btn-transparent ${switchTheme}`}
        >
          <i className="fa fa-align-center"></i>
        </button>
        <button
          onClick={_onRightAlign}
          className={`btn shadow-none btn-transparent ${switchTheme}`}
        >
          <i className="fa fa-align-right"></i>
        </button>
      </div>

      <div
        className={`container mx-auto editor-input editor ${
          currentTheme ? "dark-mode" : "light-mode"
        }`}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write something!"
          ref={editorRef}
          textAlignment={currentAligned}
        ></Editor>
      </div>
    </div>
  );
};

export default EditorContainer;
