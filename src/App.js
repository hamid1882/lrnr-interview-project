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
  const [isTab, setIsTab] = useState("all");
  const currentTheme = useSelector(selectCurrentTheme);

  const handleDrawerClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const switchTheme = currentTheme ? "dark-mode" : "light-mode";

  return (
    <div className={switchTheme}>
      <Navbar
        isDrawerOpen={isDrawerOpen}
        handleDrawerClick={handleDrawerClick}
      />
      <RenderOptions
        currentTheme={currentTheme}
        setIsTab={setIsTab}
        isTab={isTab}
      />
      <div className="mx-auto d-flex p-2 ">
        <Drawer
          isDrawerOpen={isDrawerOpen}
          handleDrawerClick={handleDrawerClick}
          currentTheme={currentTheme}
          isTab={isTab}
        />
        <EditorContainer currentTheme={currentTheme} />
      </div>
    </div>
  );
};

export default App;
