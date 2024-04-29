import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorDetails from "../components/DoctorDetails";

const Appointment = () => {
  const [appointment, setAppointment] = useState([]);

 

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]">Appointments</h2>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* doctor detils*/}
        <div className="col-span-3">
          <DoctorDetails />
        </div>
        {/* doctor suggetions */}
        <div></div>
      </div>
    </div>
  );
};

export default Appointment;
