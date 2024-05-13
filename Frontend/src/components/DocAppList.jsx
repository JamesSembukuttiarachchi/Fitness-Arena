import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPhoneFlip, FaUserInjured, FaVoicemail } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaSquareEnvelope } from "react-icons/fa6";
import { FaSquarePhoneFlip } from "react-icons/fa6";

const DocAppList = () => {
  const [appointments, setAppointments] = useState([]);
  const [editData, setEditData] = useState({
    id: null,
    fullName: "",
    contactNumber: "",
    email: "",
    message: "",
  });
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchAppointments(); // Fetch appointments when component mounts
  }, []); // Empty dependency array to ensure the effect runs only once after the component mounts

  const fetchAppointments = () => {
    // Fetch data from the appointment database
    axios
      .get("http://localhost:6005/docappointment/")
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
          .delete(`http://localhost:6005/docappointment/${id}`)
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
      selectedDate: appointment.selectedDate,
      selectedTime: appointment.selectedTime,
      message: appointment.message,
    });
    setShowEditForm(true);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:6005/docappointment/${editData.id}`, editData)
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
        setShowEditForm(false); // Close the form after updating
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

  const handleCancelEdit = () => {
    setShowEditForm(false); // Close the form when cancel is clicked
  };

  return (
    <div className="flex flex-col items-center">
      {appointments.map((appointment) => (
        <div className="w-full md:max-w-5xl sm:max-w-sm flex flex-col md:flex-row justify-between p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3">
          <div>
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Booked Appointment
            </h5>

            <ul role="list" className="space-y-5 my-7" key={appointment._id}>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaUserInjured className="text-orange-400 text-1xl" />
                <span className="text-base font-semibold leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.fullName}
                </span>
              </li>

              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaCalendarDays className="text-orange-400 text-1xl" />
                <span className="text-base font-semibold leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.selectedDate}
                </span>
              </li>
              <li className="flex items-center">
                {/* You can render appointment data dynamically here */}
                <FaClock className="text-orange-400 text-1xl" />
                <span className="text-base font-semibold leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.selectedTime}
                </span>
              </li>
            </ul>
          </div>

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
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-[999px]">
            <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
            <form onSubmit={handleUpdate}>
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                onClick={handleCancelEdit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
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
                <input
                  type="text"
                  name="date"
                  value={editData.selectedDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Date"
                  disabled
                />
                <input
                  type="text"
                  name="selectedTime"
                  value={editData.selectedTime}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Time"
                  disabled
                />
                <textarea
                  name="message"
                  value={editData.message}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Message"
                />
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocAppList;
