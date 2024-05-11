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
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
            <form onSubmit={handleUpdate}>
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
              <textarea
                name="message"
                value={editData.message}
                onChange={handleInputChange}
                placeholder="Message"
                className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mb-3"
              />
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysioAppList;
