import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./App.css";
import Operation from "./pages/Operation.jsx";
import ViewPackage from "./pages/ViewPackage.jsx";
import CreatePackage from "./pages/CreatePackage.jsx";
import Approval from "./components/Admin/Approval.jsx";
import Testing from "./pages/Testing.jsx";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Operation />} />
        <Route path="view-packages" element={<ViewPackage />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/appr" element={<Testing/>}/>
      </Routes>
    </div>
  );
};

export default App;
