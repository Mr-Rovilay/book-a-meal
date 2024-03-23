import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./router/Router"; // Assuming your router configuration is in Router.jsx
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
