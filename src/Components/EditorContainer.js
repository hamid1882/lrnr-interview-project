import React, { Component } from "react";
import { Editor, EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

export default class EditorContainer extends Component {
  constructor() {
    super();
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }

  render() {
    const blocks = convertToRaw(
      this.state.editorState.getCurrentContent()
    ).blocks;
    // eslint-disable-next-line
    const currentText = blocks.map((value) => value.text);

    return (
      <div className="w-100 vh-100 border p-2 mx-3">
        <h3 className="text-center">WYSIWYG Editor</h3>
        <div className="container mx-auto">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            customStyleMap={styleMap}
          />
        </div>
      </div>
    );
  }
}
