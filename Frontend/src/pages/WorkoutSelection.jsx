import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BioData from "../components/BioData";
import Layout from "../components/Layout/Layout";

const WorkoutSelection = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to a default route when the component mounts
    navigate("/select/form", { replace: true });
  }, []);
  return (
    <div>
      <Layout>
        <Outlet>
          <BioData path="/form" />
        </Outlet>
      </Layout>
    </div>
  );
};

export default WorkoutSelection;
