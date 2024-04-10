import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./App.css";
import Hero from "./components/Home/Hero/Hero.jsx";
import Cart from "./pages/Cart.jsx";

const App = () => {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/test" element={<Cart/>} />
    </Routes>

    </div>
  );
};

export default App;
