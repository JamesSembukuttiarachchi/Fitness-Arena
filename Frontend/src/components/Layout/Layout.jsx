import React from "react";
import Navbar from "../Navbar";
import Footer from "../Home/Footer/Footer";
import { useAuthContext } from "../../hooks/useAuthContext";
import OFooter from "../Admin/OFooter";

const Layout = ({ children }) => {
  const { user } = useAuthContext();
  // Define a function to check if the user has the admin role
  const isAdmin = user && user.role === "admin";
  const isUser = user && user.role === "user";
  return (
    <div>
      <Navbar />
      {children}
      {isAdmin ? <OFooter /> : <Footer />}
    </div>
  );
};

export default Layout;
