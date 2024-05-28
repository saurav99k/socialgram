import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Login />
    <App />
  </React.StrictMode>
);
