import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter instead of RouterProvider
import AuthProvider from "./contexts/AuthProvider"; // Assuming you have an AuthProvider
import AppRouter from "./router/Router"; // Assuming your router configuration is in Router.jsx
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
