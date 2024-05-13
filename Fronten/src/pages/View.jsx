import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Appointments</h2>
      <div className="view-appointment">
        <h1>Appointment Details</h1>
        {appointment ? (
          <div className="flex flex-col">
            {/* Render appointment details here */}
            <div>
              <p>userid: {appointment.userid}</p>
            </div>
            <div>
              <p>firstname: {appointment.firstname}</p>
            </div>
            <div>
              <p>lastname: {appointment.lastname}</p>
            </div>
            <div>
              <p>trainername: {appointment.trainername}</p>
            </div>
            <div>
              <p>email: {appointment.email}</p>
            </div>
            <div>
              <p>phone: {appointment.phone}</p>
            </div>
            <div>
              <p>date: {appointment.date}</p>
            </div>
            <div>
              {" "}
              <p>time: {appointment.time}</p>
            </div>
          </div>
        ) : (
          <p>Loading appointment details...</p>
        )}
      </div>

      {/* Link to Edit page with appointment ID as parameter */}
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};
export default View;
