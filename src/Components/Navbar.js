import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className={`row justify-content-between align-items-center p-2`}>
        <button
          className="btn shadow-none col d-flex justify-content-center mx-2"
          onClick={this.props.handleDrawerClick}
        >
          <i className="fas fa-align-left"></i>
        </button>
        <div className="d-flex col col-9 justify-content-center align-items-center gap-2 border p-2 rounded shadow">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            className="border-0 w-100 input-custom-styles"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="col col-2 d-flex gap-2">
          <button className="btn shadow-none">Invite team members</button>
          <button className="btn shadow-none">
            <i className="fa fa-bell"></i>
          </button>
          <button className="btn shadow-none">
            <i className="fa fa-user"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar;
