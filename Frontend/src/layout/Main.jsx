import React from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div className="bg-grey">
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
