import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";

const PhysioApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const formik = useFormik({
    initialValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      message: "",
      selectedPkg: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Please enter only alphabets and spaces")
        .required("Required")
        .test(
          "two-names",
          "Please enter at least two names separated by a space",
          (value) => {
            return value.trim().split(" ").length >= 2;
          }
        ),
      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      selectedPkg: Yup.string().required("Please select a package"), // Role validation
      message: Yup.string().max(50, "Message must be at most 50 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      sendAppointment(values, resetForm);
    },
  });

  const sendAppointment = (appointmentData, resetForm) => {
    const appointment = {
      ...appointmentData,
      selectedDate: selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      selectedTime,
    };

    axios
      .post("http://localhost:6005/physio/", appointment)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          Swal.fire(
            "Success!",
            "Your appointment has been booked successfully.",
            "success"
          );
          resetForm(); // Reset form values
          setSelectedDate(new Date());
          setSelectedTime("");
          setShowModal(false);
        } else {
          console.error("Failed to book appointment " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Error!",
          "An error occurred while booking the appointment.",
          "error"
        );
      });
  };
  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 16; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const formattedMinute = minute === 0 ? "00" : minute;
        timeSlots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return timeSlots;
  };

  // Function to handle key press event in full name field
  const handleFullNameKeyPress = (e) => {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // Function to handle key press event in contact field
  const handlecontactNumberKeyPress = (e) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // Function to handle key press event in contact number field
  const handlemessageKeyPress = (e) => {
    if (e.target.value.length >= 75) {
      e.preventDefault();
    }
  };

  const isTodayOrFutureDate = (date) => {
    const today = new Date();
    return date >= today;
  };
  return (
    <div>
      {" "}
      <div className=" w-1/2 bg-cyan-300 max-w-5xl">
        <h3 className="font-bold text-lg">Book Appointment</h3>
        <form onSubmit={formik.handleSubmit}>
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
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onKeyPress={handleFullNameKeyPress} // Restrict input to alphabets and spaces
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.fullName}
                  </div>
                ) : null}
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
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onKeyPress={handlecontactNumberKeyPress}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
                {formik.touched.contactNumber && formik.errors.contactNumber ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.contactNumber}
                  </div>
                ) : null}
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="selectedPkg"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a Package
                </label>
                <select
                  className={`shadow appearance-none border ${
                    formik.touched.selectedPkg && formik.errors.selectedPkg
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="selectedPkg"
                  {...formik.getFieldProps("selectedPkg")}
                >
                  <option value="">Select a Package</option>
                  <option value="Stretching">Stretching</option>
                  <option value="Massage">Massage</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Exercise Prescription">
                    Exercise Prescription
                  </option>
                  <option value="Pain Management">Pain Management</option>
                  <option value="Other">Other</option>
                  {/* Add more role options as needed */}
                </select>
                {formik.touched.selectedPkg && formik.errors.selectedPkg && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.selectedPkg}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <h2 className="font-semibold">Select a Date</h2>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  minDate={new Date()} // Set minimum date to today
                  tileDisabled={({ date }) => !isTodayOrFutureDate(date)} // Disable past dates
                  tileClassName={({ date, view }) => {
                    // Add custom classes based on specific conditions
                    const isToday = isTodayOrFutureDate(date);
                    const isSelected =
                      selectedDate.getDate() === date.getDate();
                    const isWeekend =
                      date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday

                    // Define custom classes using Tailwind CSS
                    return `
${isToday ? "text-blue" : ""} // Example: Highlight today's date
${
  isSelected ? "bg-green-500 text-white" : ""
} // Example: Highlight selected date

${
  date < new Date() ? "bg-red-300 text-gray-500" : ""
} // Example: Highlight disabled dates
`;
                  }}
                />
              </div>
              <div>
                <h2 className="font-semibold">Select a time</h2>
                <ul
                  id="timetable"
                  className="grid w-full grid-cols-4 gap-2 mt-5"
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
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyPress={handlemessageKeyPress}
              className="block p-2.5 w-3/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your message here..."
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm">
                {formik.errors.message}
              </div>
            ) : null}
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary w-1/5 rounded-lg mt-5"
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
        </form>
      </div>
    </div>
  );
};

export default PhysioApp;
