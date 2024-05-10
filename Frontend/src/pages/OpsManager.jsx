import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import Layout from "../components/Layout/Layout";
import Approval from "../components/Admin/Approval";
import ViewUsers from "../components/Admin/ViewUsers";

const OpsManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to a default route when the component mounts
    navigate("/viewuser", { replace: true });
  }, []);

  return (
    <Layout>
      <Outlet>
        <ViewUsers path="viewuser" />
      </Outlet>
    </Layout>
  );
};

export default OpsManager;
