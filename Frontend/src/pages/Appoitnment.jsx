import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorDetails from "../components/DoctorDetails";

const Appointment = () => {
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:6005/postworkout")
      .then((response) => {
        setAppointment(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
