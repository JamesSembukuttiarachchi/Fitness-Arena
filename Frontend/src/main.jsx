import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
