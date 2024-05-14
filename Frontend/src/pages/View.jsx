import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import THeader from "../components/THeader";

const View = () => {
  const [appointment, setappointments] = useState();
  const { id } = useParams(); // Extract MongoDB Object ID from URL parameters

  useEffect(() => {
    function getAppointments() {
      axios
        .get(`http://localhost:6005/appointmentsbook/${id}`)
        .then((res) => {
          console.log(res.data);
          setappointments(res.data);
        })
        .catch((err) => {
          console.error("Error fetching appointments:", err);
          // Display a more user-friendly error message
          alert("Error fetching appointments. Please try again later.");
        });
    }

    getAppointments(); // Call the function to fetch appointments when component mounts
  }, []);

  // Function to handle updating the appointment
  const handleUpdate = () => {
    // Show the modal
    setShowModal(true);
  };

  const cancelAppointment = () => {
    axios
      .delete(`http://localhost:6005/appointmentsbook/${id}`)
      .then(() => {
        alert("Appointment deleted successfully");
        navigate("/appform");
      })
      .catch((error) => {
        console.error("Failed to delete appointment:", error);
        alert("Failed to delete appointment. Error: " + error.message);
      });
  };
  // for checking
  /*return(

<div>
  <center>
<h1>view</h1>
{appointment.map((appointment,index) =>(
<div key = {appointment._id}>
  <h2>{appointment.firstname}</h2>
  <h2>{appointment.lastname}</h2>
</div>
))}


</center>
</div>

)*/

  return (
    <Layout>
      <THeader />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl mb-4">Appointment Details</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {appointment ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">First Name:</p>
                <p>{appointment.firstname}</p>
              </div>
              <div>
                <p className="font-bold">Last Name:</p>
                <p>{appointment.lastname}</p>
              </div>
              <div>
                <p className="font-bold">Trainer Name:</p>
                <p>{appointment.trainername}</p>
              </div>
              <div>
                <p className="font-bold">Email:</p>
                <p>{appointment.email}</p>
              </div>
              <div>
                <p className="font-bold">Phone:</p>
                <p>{appointment.phone}</p>
              </div>
              <div>
                <p className="font-bold">Date:</p>
                <p>{appointment.date}</p>
              </div>
              <div>
                <p className="font-bold">Time:</p>
                <p>{appointment.time}</p>
              </div>
            </div>
          ) : (
            <p>Loading appointment details...</p>
          )}
        </div>
        <Link to={`/edittrainer/${id}`}>
          <button className="btn bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-error mx-7"
          onClick={cancelAppointment}
        >
          Cancel
        </button>
        <button className="btn btn-success">
          Pay
        </button>
      </div>
    </Layout>
  );
};
export default View;
