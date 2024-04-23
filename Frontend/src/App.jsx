import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FitnessGoal from "./pages/FitnessGoal";
import BioData from "./pages/BioData";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/workoutform" element={<FitnessGoal />}>
          
        </Route>
        <Route path="/biodata/" element={<BioData/>}/>
      </Routes>
    </>
  );
};

export default App;
