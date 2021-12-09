import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

export const SERVER_URL = "https://swarm-saviour.herokuapp.com/"; //"https://swarm-saviour.herokuapp.com";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
