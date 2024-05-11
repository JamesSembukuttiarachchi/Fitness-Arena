import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorDetails from "../components/DoctorDetails";
import DocAppList from "../components/DocAppList";
import PhysioDetails from "../components/PhysioDetails";

const PhysioAppointment = () => {
  const [appointment, setAppointment] = useState([]);

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]">Make a session with Physiotherapist</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* physio detils*/}
        <div className="col-span-3">
          <PhysioDetails />
        </div>
        {/* physio appointment */}
        <div className="mt-5"></div>
      </div>
    </div>
  );
};

export default PhysioAppointment;
