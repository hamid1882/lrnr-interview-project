import React, { Component } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
// import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
// // import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from "react-froala-wysiwyg/FroalaEditorButton";
// import FroalaEditorInput from "react-froala-wysiwyg/FroalaEditorInput";
// import File from "react-froala-wysiwyg";

export default class Editor extends Component {
  constructor() {
    super();
    this.state = {
      model: "Example text",
      img: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
      },
      configImage: { imageOutputSize: true },
    };
  }

  handleModelChange = (model) => {
    this.setState({ model: model });
  };

  render() {
    const config = {
      placeholderText: "Edit Your Content Here!",
      charCounterCount: false,
    };

    return (
      <>
        <div className="w-100 p-2 ">
          <FroalaEditorComponent
            config={config}
            model={this.state.model}
            onModelChange={this.handleModelChange}
          ></FroalaEditorComponent>
        </div>
        <div className="d-none w-100 p-3">
          <FroalaEditorImg
            config={this.state.configImage}
            model={this.state.img}
          ></FroalaEditorImg>
        </div>
      </>
    );
  }
}
