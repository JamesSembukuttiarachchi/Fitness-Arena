import React from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import StoreNavbar from "../components/StoreNavbar";

const Main = () => {
  return (
    <div className="bg-Agrey">
      <StoreNavbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
