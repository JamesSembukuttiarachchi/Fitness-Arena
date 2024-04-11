import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from 'react-router-dom';

const AppForm = () => {
  const [userid, setID] = useState("");
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [trainername, setTrainer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  

  const sendData = (e) => {
    e.preventDefault();

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    const appointment = {
      userid,
      firstname,
      lastname,
      trainername,
      date,
      time: time.toString(), // Convert time to string
      email,
      phone,
    };

    axios
      .post("http://localhost:6005/appointmentsbook/", appointment)
      .then(() => {
        alert("Appointment booked successfully");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
        alert("Failed to book appointment. Error: " + error.message);
      });
  };

  return (
    <div className="AppForm">
      <center>
        <form>
          <h1 className="mb-4 text-3xl font-bold text-black">
            Booking an appointment
          </h1>
          {/* Input fields */}
          <label htmlFor="userid" className="block">
            User Id:
          </label>
          <input
            type="text"
            id="userid"
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="UserID"
            value={userid}
            onChange={(e) => setID(e.target.value)}
          />

          <label htmlFor="firstname" className="block">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirst(e.target.value)}
          />

          <label htmlFor="lastname" className="block">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLast(e.target.value)}
          />

          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="phone" className="block">
            Contact Number:
          </label>
          <input
            type="number"
            id="phone"
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="trainername" className="block">
            Trainer's Name:
          </label>
          <input
            type="text"
            id="trainername"
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Trainer's Name"
            value={trainername}
            onChange={(e) => setTrainer(e.target.value)}
          />

          {/* Date picker */}
          <label htmlFor="date" className="block">
            Date:
          </label>
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="yy-MM-dd" // Change date format
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            id="date"
          />

          {/* Time input */}
          <label htmlFor="time" className="block">
            Time:
          </label>
          <input
            type="time"
            id="time"
            className="px-4 py-2 mb-4 border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          {/* Confirm button */}
          
          <button
            onClick={sendData}
            className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-md"
          >
            Confirm
          </button>
          <br/>
          <div className="absolute right-0 mt-4 mr-4 top-20">
          <Link to="/view">
            <button className="px-6 py-3 font-semibold text-white bg-orange-500 rounded-md">
              View Appointment
            </button>
          </Link>
        </div>
        </form>
      </center>
    </div>
  );
};

export default AppForm;
