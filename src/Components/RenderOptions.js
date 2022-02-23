import React, { Component } from "react";

export default class RenderOptions extends Component {
  render() {
    return (
      <div className="container-fluid mx-auto row p-2 justify-content-center">
        <div className="col col-6">
          <button className="btn shadow-none">All</button>
          <button className="btn shadow-none">Board</button>
          <button className="btn shadow-none">Graph</button>
          <button className="btn shadow-none">Recent</button>
          <button className="btn shadow-none">
            <i className="fa fa-ellipsis-v"></i>
          </button>
        </div>
        <div className="col col-6 d-flex justify-content-end align-items-center">
          <button className="btn shadow-none">
            <i className="fa fa-telegram"></i>
          </button>
          <button className="btn shadow-none">
            <i className="fa fa-quora"></i>
          </button>
          <button className="btn shadow-none">
            <i className="fa fa-snowflake-o"></i>
          </button>
        </div>
      </div>
    );
  }
}
