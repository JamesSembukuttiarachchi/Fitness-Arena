import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import AllFeedbacks from "./pages/AllFeedbacks";
import OpManager from "./pages/OpManager";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Contact />}></Route>
      <Route path="/feedbacks" element={<AllFeedbacks />}></Route>
      <Route path="/op" element={<OpManager/>}></Route>
    </Routes>
  );
};

export default App;
