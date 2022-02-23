import React, { useState } from "react";
import Drawer from "./Components/Drawer";
import Navbar from "./Components/Navbar";
import RenderOptions from "./Components/RenderOptions";
import "./App.css";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <>
      <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <RenderOptions />
      <Drawer isDrawerOpen={isDrawerOpen} />
    </>
  );
}

export default App;
