import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUserInjured, FaCalendarDays, FaClock } from "react-icons/fa6";

const PhysioAppList = () => {
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
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get("http://localhost:6005/physio/")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const handleDelete = (id) => {
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
        axios
          .delete(`http://localhost:6005/physio/${id}`)
          .then((response) => {
            fetchAppointments();
            Swal.fire(
              "Deleted!",
              "Your appointment has been deleted.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error deleting appointment:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the appointment.",
              "error"
            );
          });
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
        setShowEditForm(false);
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
        <div
          key={appointment._id}
          className="w-full md:max-w-5xl sm:max-w-sm flex flex-col md:flex-row justify-between p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-3"
        >
          <div>
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Booked Appointment
            </h5>

            <ul role="list" className="space-y-5 my-7">
              <li className="flex items-center">
                <FaUserInjured className="text-orange-400 text-1xl" />
                <span className="text-base font-semibold leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.fullName}
                </span>
              </li>

              <li className="flex items-center">
                <FaCalendarDays className="text-orange-400 text-1xl" />
                <span className="text-base font-semibold leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {appointment.selectedDate}
                </span>
              </li>
              <li className="flex items-center">
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
      {/* Pop-up editing form */}
      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-[999px]">
            <div className="bg-white p-6 rounded-lg ">
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
                    placeholder="Full Name"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-3"
                  />
                  <input
                    type="text"
                    name="contactNumber"
                    value={editData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-3"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-3"
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
                    placeholder="Message"
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-3"
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
        </div>
      )}
    </div>
  );
};

export default PhysioAppList;
