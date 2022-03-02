import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDarkMode,
  selectCurrentTheme,
  selectAllDocuments,
} from "../Features/EditorSlice";

const Navbar = ({ handleDrawerClick }) => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [searchFiles, setSearchFiles] = useState(false);
  const [currentSearch, setCurrentSearch] = useState("");

  const dispatch = useDispatch();

  // Getting current theme and all collections for search input
  const currentTheme = useSelector(selectCurrentTheme);
  const allDocumentData = useSelector(selectAllDocuments);

  const handleIsUserClicked = () => {
    setIsUserClicked(!isUserClicked);
  };

  // Toggle theme on click
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode(!currentTheme));
  };

  const handleCurrentSearch = (e) => {
    e.preventDefault();
    setCurrentSearch(e.target.value);
  };

  const filteredData = allDocumentData.filter((value) =>
    value.label.toLowerCase().includes(currentSearch.toLowerCase())
  );

  // Search results
  useEffect(() => {
    if (currentSearch.length > 0) {
      setSearchFiles(true);
    } else {
      setSearchFiles(false);
    }
  }, [currentSearch]);

  // Switch theme styles
  const switchTheme = currentTheme ? "dark-mode btn-hover" : "light-mode";

  return (
    <div
      className={`row container-fluid mx-auto justify-content-between align-items-center p-2 ${switchTheme}`}
    >
      <button
        className={`btn shadow-none col d-flex justify-content-start mx-2 ${
          currentTheme ? "btn-hover" : ""
        }`}
        onClick={handleDrawerClick}
      >
        <i
          className={`fas fa-align-left ${
            currentTheme ? "text-light" : "text-dark"
          }`}
        ></i>
      </button>
      <div
        className={`nav-serch-results  shadow ${
          searchFiles ? "d-block" : "d-none"
        } ${switchTheme}`}
      >
        {filteredData.length === 0 && (
          <h5 className={`text-secondary p-3 ${switchTheme}`}>
            No Results found
          </h5>
        )}
        <div className={`p-2 results-div   ${switchTheme}`}>
          {filteredData.map((value) => (
            <div key={value.nodeId} className={`search-result-files p-1 `}>
              {value.label}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`d-none d-lg-flex d-flex col col-9 justify-content-start align-items-center gap-2 p-2 rounded shadow ${
          currentTheme ? "border border-light" : "border border-dark"
        }`}
      >
        <i className="fa fa-search" aria-hidden="true"></i>

        <input
          className={`border-0 w-100 input-custom-styles ${switchTheme}`}
          type="text"
          placeholder="Search Collection"
          value={currentSearch}
          onChange={handleCurrentSearch}
        />
      </div>
      <div className="col col-2 d-flex gap-2 justify-content-end">
        <button className={`btn shadow-none ${switchTheme}`}>Invite</button>
        <button className={`btn shadow-none ${switchTheme}`}>
          <i className="fa fa-bell"></i>
        </button>
        <button
          className={`btn shadow-none user-btn ${
            isUserClicked ? "rounded-circle bg-success" : "null"
          } ${switchTheme}`}
          onClick={handleIsUserClicked}
        >
          <i className="fa fa-user"></i>
        </button>
        <div
          className={`user-menu d-grid shadow p-2 rounded ${
            isUserClicked ? "d-block" : "d-none"
          } ${switchTheme}`}
        >
          <div
            className={`px-2 py-2 d-flex justify-content-between align-items-center cursor  ${
              currentTheme ? "user-btn-active rounded" : "null"
            } `}
          >
            <div>
              <i className="fa fa-modx mx-1"></i>
              <span className="fs-5 mx-1">Dark Mode</span>
            </div>
            <div className="form-check form-switch cursor">
              <input
                className="form-check-input shadow-none cursor"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={handleToggleDarkMode}
              />
            </div>
          </div>
          <button
            className={`btn shadow-none d-flex justify-content-start align-items-center gap-2 user-btns ${switchTheme}`}
          >
            <i className="fa fa-user"></i>
            <span className="fs-5">Profile</span>
          </button>
          <button
            className={`btn shadow-none d-flex justify-content-start align-items-center gap-2 user-btns ${switchTheme}`}
          >
            <i className="fa fa-dashboard"></i>
            <span className="fs-5">Dashboard</span>
          </button>
          <button
            className={`btn shadow-none d-flex justify-content-start align-items-center gap-2 user-btns ${switchTheme}`}
          >
            <i className="fa fa-sign-out"></i>
            <span className="fs-5">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
