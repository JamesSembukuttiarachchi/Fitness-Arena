import React, { useState,useEffect } from "react";

import axios from "axios";
//import { Link } from 'react-router-dom';

const View = () =>{

const[appointment,setappointments] = useState([]);

useEffect(() => {
    function getAppointments() {
      axios.get("http://localhost:6005/appointmentsbook/")
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
      <ul>
        {appointment.map((appointment, index) => (
          <li key={index}>
            <p>Name: {appointment.userid}</p>
            <p>Date: {appointment.firstname}</p>
            <p>Time: {appointment.lastname}</p>
            <p>Time: {appointment.trainername}</p>
            <p>Time: {appointment.email}</p>
            <p>Time: {appointment.phone}</p>
            <p>Time: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            {/* Add more appointment details here */}
          </li>
       ))}
      </ul>
   </div>
  );



}
export default View;
