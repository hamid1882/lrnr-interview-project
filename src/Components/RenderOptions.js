import React from "react";

const RenderOptions = ({ currentTheme, isTab, setIsTab }) => {
  const switchTheme = currentTheme ? "dark-mode btn-hover" : "light-mode";

  const handleCurrentTab = (e) => {
    setIsTab(e.target.id);
  };
  return (
    <div
      className={`container-fluid mx-auto row p-2 justify-content-start category-container ${
        currentTheme ? "nav-border-dark" : "border-bottom"
      } ${switchTheme} `}
    >
      <div>
        <button
          className={`btn shadow-none rounded-0 ${switchTheme} ${
            isTab === "all" ? "category-btn-border" : ""
          }`}
          onClick={handleCurrentTab}
          id="all"
        >
          All
        </button>
        <button
          className={`btn shadow-none ${switchTheme} ${
            isTab === "board" ? "category-btn-border" : ""
          }`}
          onClick={handleCurrentTab}
          id="board"
        >
          Board
        </button>
        <button
          className={`btn shadow-none ${switchTheme} ${
            isTab === "graph" ? "category-btn-border" : ""
          }`}
          onClick={handleCurrentTab}
          id="graph"
        >
          Graph
        </button>
        <button
          className={`btn shadow-none d-none d-md-inline-block ${switchTheme} ${
            isTab === "recent" ? "category-btn-border" : ""
          }`}
          onClick={handleCurrentTab}
          id="recent"
        >
          Recent
        </button>
        <button className={`btn shadow-none  ${switchTheme} `}>
          <i className="fa fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
};

export default RenderOptions;
