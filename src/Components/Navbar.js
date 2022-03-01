import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectCurrentTheme } from "../Features/EditorSlice";

const Navbar = ({ handleDrawerClick }) => {
  const [isUserClicked, setIsUserClicked] = useState(false);
  const currentTheme = useSelector(selectCurrentTheme);
  const dispatch = useDispatch();

  const handleIsUserClicked = () => {
    if (isUserClicked === false) {
      setIsUserClicked(true);
    } else {
      setIsUserClicked(false);
    }
  };

  const handleToggleDarkMode = () => {
    if (currentTheme) {
      dispatch(toggleDarkMode(false));
    } else {
      dispatch(toggleDarkMode(true));
    }
  };

  return (
    <div
      className={`row container-fluid mx-auto justify-content-between align-items-center p-2 ${
        currentTheme ? "dark-mode" : "light-mode"
      }`}
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
        className={`d-none d-lg-flex d-flex col col-9 justify-content-center align-items-center gap-2 p-2 rounded shadow ${
          currentTheme ? "border border-light" : "border border-dark"
        }`}
      >
        <i className="fa fa-search" aria-hidden="true"></i>
        <input
          className={`border-0 w-100 input-custom-styles ${
            currentTheme ? "dark-mode" : "light-mode"
          }`}
          type="text"
          placeholder="search"
        />
      </div>
      <div className="col col-2 d-flex gap-2 justify-content-end">
        <button
          className={`btn shadow-none ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          Invite
        </button>
        <button
          className={`btn shadow-none ${
            currentTheme ? "dark-mode btn-hover" : "light-mode"
          }`}
        >
          <i className="fa fa-bell"></i>
        </button>
        <button
          className={`btn shadow-none user-btn ${
            isUserClicked ? "rounded-circle bg-warning" : "null"
          } ${currentTheme ? "dark-mode btn-hover" : "light-mode"}`}
          onClick={handleIsUserClicked}
        >
          <i className="fa fa-user"></i>
        </button>
        <div
          className={`user-menu d-grid shadow p-2 rounded ${
            isUserClicked ? "d-block" : "d-none"
          } ${currentTheme ? "dark-mode" : "light-mode"}`}
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
            className={`btn shadow-none d-flex justify-content-start align-items-center gap-2 user-btns ${
              currentTheme ? "dark-mode btn-hover" : "light-mode"
            }`}
          >
            <i className="fa fa-user"></i>
            <span className="fs-5">Profile</span>
          </button>
          <button
            className={`btn shadow-none d-flex justify-content-start align-items-center gap-2 user-btns ${
              currentTheme ? "dark-mode btn-hover" : "light-mode"
            }`}
          >
            <i className="fa fa-dashboard"></i>
            <span className="fs-5">Dashboard</span>
          </button>
          <button
            className={`btn shadow-none d-flex justify-content-start align-items-center gap-2 user-btns ${
              currentTheme ? "dark-mode btn-hover" : "light-mode"
            }`}
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
