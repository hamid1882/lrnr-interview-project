import React, { useState, useRef, useEffect } from "react";
// import { useSelector } from "react-redux";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
// import { selectCurrentValue } from "../Features/EditorSlice";

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

const EditorContainer = ({ currentTheme }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentAligned, setCurrentAligned] = useState("left");

  // const newData = "Enter me into your editor";

  // setEditorState.createWithContent(newData);

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

  return (
    <div
      className={`container mx-auto editor-width h-100 border p-2 mx-3 ${
        currentTheme ? "border-secondary" : "null"
      }`}
    >
      <h3 className="text-center">WYSIWYG Editor</h3>
      <div className="d-flex justify-content-start gap-2 my-2">
        <button
          onClick={_onBoldClick}
          className={`btn shadow-none btn-transparent ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          <i className="fa fa-bold"></i>
        </button>
        <button
          onClick={_onItalicClick}
          className={`btn shadow-none btn-transparent ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          <i className="fa fa-italic"></i>
        </button>
        <button
          onClick={_onUnderlineClick}
          className={`btn shadow-none btn-transparent ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          <i className="fa fa-underline"></i>
        </button>
        <button
          onClick={_onLeftAlign}
          className={`btn shadow-none btn-transparent ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          <i className="fa fa-align-left"></i>
        </button>
        <button
          onClick={_onCenterAlign}
          className={`btn shadow-none btn-transparent ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          <i className="fa fa-align-center"></i>
        </button>
        <button
          onClick={_onRightAlign}
          className={`btn shadow-none btn-transparent ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
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
          customStyleMap={styleMap}
          placeholder="Write something!"
          ref={editorRef}
          textAlignment={currentAligned}
        ></Editor>
      </div>
    </div>
  );
};

export default EditorContainer;
