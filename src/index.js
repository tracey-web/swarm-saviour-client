import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

export const SERVER_URL = "http://localhost:4567";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
