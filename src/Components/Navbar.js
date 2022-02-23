import React from "react";

const Navbar = () => {
  return (
    <div className="row justify-content-between align-items-center p-2">
      <button className="btn btn-light col">
        <i className="fas fa-align-left"></i>
      </button>
      <div className="d-flex col col-9 justify-content-center align-items-center gap-2 border p-2 rounded shadow">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input
          className="border-0 w-100 input-custom-styles"
          type="text"
          placeholder="search"
        />
      </div>
      <div className="col col-2 d-flex gap-2">
        <button className="btn btn-light">Invite team members</button>
        <button className="btn btn-light">
          <i class="fa fa-bell"></i>
        </button>
        <button className="btn btn-light">
          <i className="fa fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
