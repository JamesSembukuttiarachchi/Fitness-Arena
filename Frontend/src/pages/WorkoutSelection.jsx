import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BioData from "../components/BioData";

const WorkoutSelection = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to a default route when the component mounts
    navigate("/select/form", { replace: true });
  }, []);
  return (
    <div>
      <Outlet>
        <BioData path="/form" />
      </Outlet>
    </div>
  );
};

export default WorkoutSelection;
