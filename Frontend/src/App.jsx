import React from "react";
import InjuryPage from "./pages/InjuryPage";
import Appointment from "./pages/Appoitnment";
import { Routes, Route, Router } from "react-router-dom";
import WorkoutRecovery from "./pages/WorkoutRecovery";
import PhysioApp from "./pages/PhysioApp";
import AppHistory from "./pages/AppHistory";
import DocAppList from "./components/DocAppList";
import PhysioAppList from "./components/PhysioAppList";
import PhysioAppointment from "./pages/PhysioAppointment";

const App = () => {
  return (
    <Routes>
      <Route path="/injury" element={<InjuryPage />} />
      <Route path="/appoinments" element={<Appointment />} />
      <Route path="/physioapp" element={<PhysioAppointment />} />
      <Route path="/recovery" element={<WorkoutRecovery />} />
      <Route path="/physio" element={<PhysioApp />} />
      <Route path="/apphistory" element={<AppHistory />}>
        <Route path="docapp" element={<DocAppList/>}/>
        <Route path="phyapp" element={<PhysioAppList/>}/>
      </Route>

    </Routes>
  );
};

export default App;
