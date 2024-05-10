import React from "react";
import InjuryPage from "./pages/InjuryPage";
import Appointment from "./pages/Appoitnment";
import { Routes, Route, Router } from "react-router-dom";
import WorkoutRecovery from "./pages/WorkoutRecovery";
import PhysioApp from "./pages/PhysioApp";

const App = () => {
  return (
    <Routes>
      <Route path="/injury" element={<InjuryPage />} />
      <Route path="/appoinments" element={<Appointment />} />
      <Route path="/recovery" element={<WorkoutRecovery />} />
      <Route path="/physio" element={<PhysioApp />} />
    </Routes>
  );
};

export default App;
