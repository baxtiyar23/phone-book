import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bundle.css";
import "./assets/styles/main.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);