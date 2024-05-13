import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Edit = () => {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [trainername, setTrainer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const { id } = useParams(); // Extract MongoDB Object ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch appointment details based on the appointment ID
    axios
      .get(`http://localhost:6005/appointmentsbook/${id}`)
      .then((res) => {
        const appointmentData = res.data;
        // Set state values for each input field based on fetched appointment details
        setFirst(appointmentData.firstname);
        setLast(appointmentData.lastname);
        setTrainer(appointmentData.trainername);
        setEmail(appointmentData.email);
        setPhone(appointmentData.phone);
        setDate(new Date(appointmentData.date));
        setTime(appointmentData.time);
      })
      .catch((error) => {
        console.error("Error fetching appointment:", error);
        alert("Error fetching appointment. Please try again later.");
      });
  }, [id]);

  const sendData = (e) => {
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

    axios
      .put(`http://localhost:6005/appointmentsbook/${id}`, appointment)
      .then(() => {
        alert("Appointment updated successfully");
        navigate(-1); // Redirect to the previous page
      })
      .catch((error) => {
        console.error("Failed to edit appointment:", error);
        alert("Failed to edit appointment. Error: " + error.message);
      });
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

  return (
    <Layout>
    <div className="AppForm flex justify-center items-center h-screen">
      <form className="w-full max-w-sm" onSubmit={sendData}>
        <h1 className="mb-4 text-3xl font-bold text-black">
          Edit Your Appointment
        </h1>

        {/* Input fields */}
        <div className="flex gap-3">
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-bold mb-2">
              First Name:
            </label>
            <input
              type="text"
              id="firstname"
              className="input-field"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-bold mb-2">
              Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              className="input-field"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-bold mb-2">
              Contact Number:
            </label>
            <input
              type="number"
              id="phone"
              className="input-field"
              placeholder="Contact Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="trainername" className="block text-sm font-bold mb-2">
            Trainer's Name:
          </label>
          <input
            type="text"
            id="trainername"
            className="input-field"
            placeholder="Trainer's Name"
            value={trainername}
            onChange={(e) => setTrainer(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          {/* Date picker */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-bold mb-2">
              Date:
            </label>
            <DatePicker
              selected={date}
              onChange={setDate}
              dateFormat="yy-MM-dd"
              className="input-field"
              id="date"
            />
          </div>

          {/* Time input */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-bold mb-2">
              Time:
            </label>
            <input
              type="time"
              id="time"
              className="input-field"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        {/* Confirm and Cancel buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="btn bg-orange-500 hover:bg-orange-700"
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={cancelAppointment}
          >
            Cancel Appointment
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default Edit;
