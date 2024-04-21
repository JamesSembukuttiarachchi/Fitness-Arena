import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//import ProcessPayment from "../pages/PaymentProcess.jsx";
//import PaymentScreen from "../pages/paymentScreen.jsx";
//import PrivateRoute from "../components/PrivateRoutes.jsx";
import { BrowserRouter, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

/*const router = createBrowserRouter(
  createRoutesFromElements(
  
    <Route path="/" elements={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/payment" element={<PaymentScreen />} />
      </Route>
    </Route>
  )
);*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
