import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./App.css";
import Hero from "./components/Home/Hero/Hero.jsx";
import Cart from "./pages/Cart.jsx";
import Header from "./components/Home/Header/Header.jsx";
import Sidebar from "./components/Admin/Header.jsx";
import Operation from "./pages/Operation.jsx";
import ViewPackage from "./pages/ViewPackage.jsx";
import CreatePackage from "./pages/CreatePackage.jsx";

const App = () => {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/test" element={<Operation/>} />
      <Route path="view-packages" element={<ViewPackage/>}/>
      <Route path="/create-package" element={<CreatePackage/>}/>
    </Routes>

    </div>
  );
};

export default App;
