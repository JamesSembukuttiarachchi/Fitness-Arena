import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Category category="men" />} />
          <Route path="/men/product/:productId" element={<Product />} />
          <Route path="/women" element={<Category category="women" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
