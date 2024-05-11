import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPhoneFlip, FaUserInjured, FaVoicemail } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaSquareEnvelope } from "react-icons/fa6";
import { FaSquarePhoneFlip } from "react-icons/fa6";

const PhysioAppList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState({
    id: null,
    fullName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetchAppointments(); // Fetch appointments when component mounts
  }, []); // Empty dependency array to ensure the effect runs only once after the component mounts

  const fetchAppointments = () => {
    // Fetch data from the appointment database
    axios
      .get("http://localhost:6005/physio/")
      .then((response) => {
        // If the request is successful, update the state with the fetched appointments
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }; // Empty dependency array to ensure the effect runs only once after the component mounts

  const handleDelete = (id) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this appointment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, send delete request to backend API
        axios
          .delete(`http://localhost:6005/physio/${id}`)
          .then((response) => {
            // If delete is successful, fetch updated list of appointments
            fetchAppointments();
            // Show success message using SweetAlert
            Swal.fire(
              "Deleted!",
              "Your appointment has been deleted.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting appointment:", error);
            // Show error message using SweetAlert
            Swal.fire(
              "Error!",
              "An error occurred while deleting the appointment.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If user cancels, do nothing
      }
    });
  };

  const handleEdit = (appointment) => {
    setEditData({
      id: appointment._id,
      fullName: appointment.fullName,
      contactNumber: appointment.contactNumber,
      email: appointment.email,
      message: appointment.message,
    });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:6005/physio/${editData.id}`, editData)
      .then((response) => {
        fetchAppointments();
        Swal.fire(
          "Updated!",
          "Your appointment has been updated successfully.",
          "success"
        );
        setEditData({
          id: null,
          fullName: "",
          contactNumber: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
        Swal.fire(
          "Error!",
          "An error occurred while updating the appointment.",
          "error"
        );
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="">
      {appointments.map((appointment) => (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Booked Appointment
          </h5>

          <ul role="list" className="space-y-5 my-7" key={appointment._id}>
            <div>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaUserInjured />
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.fullName}
                </span>
              </li>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaPhoneFlip />
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.contactNumber}
                </span>
              </li>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaSquareEnvelope />
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.email}
                </span>
              </li>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaSquareEnvelope />
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.selectedPkg}
                </span>
              </li>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaCalendarDays />
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.selectedDate}
                </span>
              </li>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaClock />
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.selectedTime}
                </span>
              </li>
            </div>
          </ul>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleEdit(appointment)}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => handleDelete(appointment._id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
      {/* Form for editing appointment data */}
      {editData.id && (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Edit Appointment
            <br />
            <span className="text-sm text-gray-400">
              You cannot change the date and time
            </span>
          </h5>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col space-y-3">
              <input
                type="text"
                name="fullName"
                value={editData.fullName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Full Name"
              />
              <input
                type="text"
                name="contactNumber"
                value={editData.contactNumber}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Contact Number"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Email"
              />
              <textarea
                name="message"
                value={editData.message}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Message"
              />
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PhysioAppList;
