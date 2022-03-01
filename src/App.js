import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "./Features/EditorSlice";
import Drawer from "./Components/Drawer";
import Navbar from "./Components/Navbar";
import RenderOptions from "./Components/RenderOptions";
import EditorContainer from "./Components/EditorContainer";
import "./App.css";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const currentTheme = useSelector(selectCurrentTheme);

  const handleDrawerClick = () => {
    if (isDrawerOpen === true) {
      setIsDrawerOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  };

  return (
    <div className={`${currentTheme ? "dark-mode" : "light-mode"}`}>
      <Navbar
        isDrawerOpen={isDrawerOpen}
        handleDrawerClick={handleDrawerClick}
      />
      <RenderOptions />
      <div className="mx-auto d-flex gap-2 p-2">
        <Drawer
          isDrawerOpen={isDrawerOpen}
          handleDrawerClick={handleDrawerClick}
          currentTheme={currentTheme}
        />
        <EditorContainer currentTheme={currentTheme} />
      </div>
    </div>
  );
};

export default App;
