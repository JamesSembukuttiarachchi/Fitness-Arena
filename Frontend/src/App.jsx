import React from "react";
import { Routes, Route } from "react-router-dom";
//import PaymentDetails from './pages/PaymentDetails';
import MinindiTest from "./pages/MinindiTest";
import SaveCard from "./pages/SaveCard";
import Profile from "./pages/Profile";
import ViewCards from "./pages/ViewCards";
import EditBook from "./pages/EditCard";
import DeleteCard from "./pages/DeleteCard";
import Invoice from "./pages/Invoice";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/view" element={<ViewCards />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/delete/:id" element={<DeleteCard />} />
        <Route path="/minindi" element={<MinindiTest />} />
        <Route path="/save" element={<SaveCard />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </div>
  );
};

export default App;
