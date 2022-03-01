import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../Features/EditorSlice";

const RenderOptions = () => {
  const currentTheme = useSelector(selectCurrentTheme);
  return (
    <div
      className={`container-fluid mx-auto row p-2 justify-content-start  ${
        currentTheme ? "dark-mode" : "light-mode"
      }`}
    >
      <div>
        <button
          className={`btn shadow-none category-btn-border rounded-0 ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          All
        </button>
        <button
          className={`btn shadow-none ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          Board
        </button>
        <button
          className={`btn shadow-none ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          Graph
        </button>
        <button
          className={`btn shadow-none d-none d-md-inline-block ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          Recent
        </button>
        <button
          className={`btn shadow-none  ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          <i className="fa fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
};

export default RenderOptions;
