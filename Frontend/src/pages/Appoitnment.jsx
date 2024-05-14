import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorDetails from "../components/DoctorDetails";
import DocAppList from "../components/DocAppList";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Appointment = () => {
  const [appointment, setAppointment] = useState([]);

  return (
    <Layout>
      <div className="p-5 md:px-20">
        <div className="flex justify-between">
          <h2 className="font-bold text-[22px]">Meet a Doctor</h2>
          <Link to="/apphistory">
            <button className="btn bg-orange-500 hover:bg-orange-700">
              View Appointments
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* doctor detils*/}
          <div className="col-span-3">
            <DoctorDetails />
          </div>
          {/* doctor appointment */}
          <div className="mt-5"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Appointment;
