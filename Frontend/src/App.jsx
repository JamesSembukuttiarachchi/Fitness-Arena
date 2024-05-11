import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import AllFeedbacks from "./pages/AllFeedbacks";
import OpManager from "./pages/OpManager";
import ViewFeedbacks from "./pages/ViewFeedbacks";
import CreateOffer from "./components/CreateOffer";
import OfferForm from "./pages/OfferForm";
import ViewOffer from "./components/ViewOffer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Contact />}></Route>
      <Route path="/feedbacks" element={<AllFeedbacks />}></Route>
      <Route path="/op" element={<OpManager/>}></Route>
      <Route path="/viewfeedback" element={<ViewFeedbacks/>}/>
      <Route path="/create" element={<CreateOffer/>}>
        <Route path="offerform" element={<OfferForm/>}/>
        <Route path="viewoffer" element={<ViewOffer/>}/>
      </Route>
    </Routes>
  );
};

export default App;
