import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Operation from "./Operation";
import Layout from "../components/Layout/Layout";

const PkgManager = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Redirect to a default route when the component mounts
        navigate("/test", { replace: true });
      }, []);
  return (
    <Layout>
      <Outlet>
        <Operation path="test" />
      </Outlet>
    </Layout>
  )
}

export default PkgManager
