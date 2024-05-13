import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import WorkoutSelection from "./pages/WorkoutSelection";
import BioData from "./components/BioData";
import FitnessGoal from "./components/FitnessGoal";
import FinalForm from "./components/FinalForm";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/workoutform" element={<FitnessGoal />}></Route>
        <Route path="/biodata/:id" element={<BioData />} />
        <Route path="/final/:id" element={<FinalForm/>}/>
        <Route path="/select" element={<WorkoutSelection/>}>
          <Route path="form" element={<BioData/>}/>
          <Route path="goal/:id" element={<FitnessGoal/>}/>
          <Route path="confirm/:id" element={<FinalForm/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
