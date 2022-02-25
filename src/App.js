import React, { Component } from "react";
import Drawer from "./Components/Drawer";
import Navbar from "./Components/Navbar";
import RenderOptions from "./Components/RenderOptions";
import EditorContainer from "./Components/EditorContainer";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: true,
    };
  }

  render() {
    const isDrawerOpen = this.state.isDrawerOpen;

    const handleDrawerClick = () => {
      if (isDrawerOpen === true) {
        this.setState({ isDrawerOpen: false });
      } else {
        this.setState({ isDrawerOpen: true });
      }
    };

    return (
      <>
        <Navbar
          isDrawerOpen={isDrawerOpen}
          handleDrawerClick={handleDrawerClick}
        />
        <RenderOptions />
        <div className="mx-auto d-flex gap-2 p-2">
          <Drawer
            isDrawerOpen={isDrawerOpen}
            handleDrawerClick={handleDrawerClick}
          />
          <EditorContainer />
        </div>
      </>
    );
  }
}

export default App;
