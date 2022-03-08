import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import Store from "./Store/Store";
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
