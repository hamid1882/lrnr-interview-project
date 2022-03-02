import React from "react";

const RenderOptions = ({ currentTheme }) => {
  const switchTheme = currentTheme ? "dark-mode btn-hover" : "light-mode";
  return (
    <div
      className={`container-fluid mx-auto row p-2 justify-content-start category-container border-bottom ${switchTheme}`}
    >
      <div>
        <button
          className={`btn shadow-none category-btn-border rounded-0 ${switchTheme}`}
        >
          All
        </button>
        <button className={`btn shadow-none ${switchTheme}`}>Board</button>
        <button className={`btn shadow-none ${switchTheme}`}>Graph</button>
        <button
          className={`btn shadow-none d-none d-md-inline-block ${switchTheme}`}
        >
          Recent
        </button>
        <button className={`btn shadow-none  ${switchTheme}`}>
          <i className="fa fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
};

export default RenderOptions;
