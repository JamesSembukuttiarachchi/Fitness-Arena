import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FitnessGoal from "./pages/FitnessGoal";
import BioData from "./pages/BioData";
import FinalForm from "./pages/FinalForm";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/workoutform" element={<FitnessGoal />}></Route>
        <Route path="/biodata/:id" element={<BioData />} />
        <Route path="/final/:id" element={<FinalForm/>}/>
      </Routes>
    </>
  );
};

export default App;
