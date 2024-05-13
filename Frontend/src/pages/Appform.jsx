import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuthContext } from "../hooks/useAuthContext";

const AppForm = () => {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [trainername, setTrainer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          `http://localhost:6005/api/users/${user.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        setUserId(data._id);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    if (user) {
      fetchUserId();
    }
  }, []); // Empty dependency array ensures the effect runs only once

  const sendData = async (e) => {
    e.preventDefault();

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const appointment = {
      firstname,
      lastname,
      trainername,
      date,
      time: time.toString(), // Convert time to string
      email,
      phone,
    };

    try {
      const response = await axios.post(
        "http://localhost:6005/appointmentsbook/",
        appointment
      );
      const appointmentId = response.data._id;
      alert("Appointment booked successfully");

      // Update the user's trainerApp field
      await axios.put(
        `http://localhost:6005/api/users/${userId}`,
        {
          trainerApp: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      window.location.href = `/view/${appointmentId}`;
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Error: " + error.message);
    }
  };
  return (
    <Layout>
      <div className="AppForm flex justify-center items-center h-full">
        <form className="w-full max-w-lg p-6">
          <h1 className="mb-6 text-3xl font-bold text-black text-center">
            Booking an appointment
          </h1>
          {/* Input fields */}
          <div className="flex gap-3">
            <div className="mb-4">
              <label htmlFor="firstname" className="block mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirst(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className="block mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLast(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-1">
                Contact Number:
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="trainername" className="block mb-1">
              Trainer's Name:
            </label>
            <input
              type="text"
              id="trainername"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Trainer's Name"
              value={trainername}
              onChange={(e) => setTrainer(e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-3">
            {/* Date picker */}
            <div className="mb-4">
              <label htmlFor="date" className="block mb-1">
                Date:
              </label>
              <DatePicker
                selected={date}
                onChange={setDate}
                dateFormat="yyyy-MM-dd"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="date"
              />
            </div>
            {/* Time input */}
            <div className="mb-4">
              <label htmlFor="time" className="block mb-1">
                Time:
              </label>
              <input
                type="time"
                id="time"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={sendData}
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Confirm
          </button>
          {/* View appointment button */}
          <div className="mt-4 text-right">
            <Link to="/view">
              <button className="py-3 px-6 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none">
                View Appointment
              </button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AppForm;
