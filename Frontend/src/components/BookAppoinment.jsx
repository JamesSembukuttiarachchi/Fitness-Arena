import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time slot
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const doctorName = "George";
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  const [email, setEmail] = useState(""); // Changed from useremail to email

  const sendAppointment = (e) => {
    e.preventDefault();

    const appointment = {
      fullName,
      contactNumber,
      email,
      selectedDate: selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }), // Format date string as "May 01 2024"
      selectedTime,
      message,
    };

    // Send appointment data to the backend using Axios
    axios
      .post("http://localhost:6005/docappointment/", appointment)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("Appointment booked successfully");

          // Show success message using SweetAlert
          Swal.fire(
            "Success!",
            "Your appointment has been booked successfully.",
            "success"
          );
          // Reset form values
          setFullName("");
          setContactNumber("");
          setEmail("");
          setSelectedDate(new Date());
          setSelectedTime("");
          setMessage("");

          // Close modal
          setShowModal(false);
        } else {
          console.error("Failed to book appointment " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show error message using SweetAlert
        Swal.fire(
          "Error!",
          "An error occurred while booking the appointment.",
          "error"
        );
      });

    // Send email using Nodemailer via Axios
    /*axios.post("http://localhost:6005/sendemail/", appointment)
      .then((response) => {
        if (response.status === 200) {
          console.log("Email sent successfully");
        } else {
          console.error("Failed to send email");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });*/
  };

  // Function to handle click event on time slots
  const handleTimeSlotClick = (time) => {
    setSelectedTime(time); // Update selected time slot
  };

  // Function to generate time slots increased by half an hour
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const formattedMinute = minute === 0 ? "00" : minute;
        timeSlots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return timeSlots;
  };

  return (
    <div>
      <button
        className="btn btn-wide bg-orange-500 text-white rounded-lg"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        Book Appointment
      </button>
      {showModal && (
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-1/2 max-w-5xl">
            <h3 className="font-bold text-lg">Book Appointment</h3>
            <div className="modal-action flex flex-col">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="font-semibold">Select a Date</h2>
                  {/*<input type="date" name="selectDate" id="selectDate" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />*/}
                  <Calendar onChange={setSelectedDate} value={selectedDate} />
                </div>
                <div>
                  <h2 className="font-semibold">Select a time</h2>
                  <ul
                    id="timetable"
                    className="grid w-full grid-cols-2 gap-2 mt-5"
                  >
                    {generateTimeSlots().map((timeSlot) => (
                      <li key={timeSlot}>
                        <input
                          type="radio"
                          id={timeSlot}
                          value={timeSlot}
                          className="hidden peer"
                          name="timetable"
                          onChange={() => handleTimeSlotClick(timeSlot)}
                          checked={selectedTime === timeSlot}
                        />
                        <label
                          htmlFor={timeSlot}
                          className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                        >
                          {timeSlot}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="4"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your message here..."
              ></textarea>
              <div className="flex justify-center">
                <button
                  className="btn btn-primary w-1/5 rounded-lg mt-5"
                  onClick={sendAppointment}
                >
                  Submit
                </button>
              </div>

              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BookAppointment;
