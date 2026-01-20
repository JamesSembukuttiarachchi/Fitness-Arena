import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import THeader from "../components/THeader";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";

const View = () => {
  const { user } = useAuthContext(); // logged-in user
  const { id } = useParams(); // appointment ID from URL
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // If user is not logged in, redirect immediately
    if (!user || !user.token) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "You must be logged in to view this appointment.",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // Validate appointment ID format (basic check)
    if (!id || id.length !== 24) {
      setErrorMsg("Invalid appointment ID format");
      setLoading(false);
      return;
    }

    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await axios.get(
          `http://localhost:6005/appointmentsbook/${id}`,
          {
            headers: { 
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json"
            },
            timeout: 10000, // 10 second timeout
          }
        );

        if (res.data) {
          setAppointment(res.data);
        } else {
          setErrorMsg("No appointment data received");
        }
      } catch (err) {
        console.error("Error fetching appointment:", err);
        
        if (err.response?.status === 401) {
          setErrorMsg("Your session has expired. Please log in again.");
          // Optionally logout user and redirect
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 404) {
          setErrorMsg("Appointment not found or you don't have permission to view it.");
        } else if (err.response?.status === 400) {
          setErrorMsg("Invalid request. Please check the appointment ID.");
        } else if (err.code === 'ECONNABORTED') {
          setErrorMsg("Request timeout. Please check your connection and try again.");
        } else if (err.response?.data?.message) {
          setErrorMsg(err.response.data.message);
        } else {
          setErrorMsg("Failed to fetch appointment. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id, user, navigate]);

  const cancelAppointment = async () => {
    const result = await Swal.fire({
      title: 'Cancel Appointment?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:6005/appointmentsbook/${id}`, {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
        timeout: 10000,
      });

      await Swal.fire({
        icon: "success",
        title: "Appointment Cancelled",
        text: "Your appointment has been cancelled successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/appform");
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      
      let errorMessage = "Failed to cancel appointment";
      if (err.response?.status === 401) {
        errorMessage = "Your session has expired. Please log in again.";
      } else if (err.response?.status === 404) {
        errorMessage = "Appointment not found or already cancelled.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Cancellation Failed",
        text: errorMessage,
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <THeader />
        <div className="container p-4 mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-lg text-gray-600">Loading appointment details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (errorMsg) {
    return (
      <Layout>
        <THeader />
        <div className="container p-4 mx-auto">
          <div className="px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
            <h2 className="mb-2 text-xl font-bold">Error</h2>
            <p>{errorMsg}</p>
            <div className="mt-4">
              <Link
                to="/appform"
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Back to Appointments
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // No appointment found
  if (!appointment) {
    return (
      <Layout>
        <THeader />
        <div className="container p-4 mx-auto">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-700">Appointment Not Found</h2>
            <p className="mb-4 text-gray-600">The requested appointment could not be found.</p>
            <Link
              to="/appform"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Back to Appointments
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <THeader />
      <div className="container p-4 mx-auto">
        <div className="mb-4">
          <h2 className="mb-2 text-3xl font-bold text-gray-800">Appointment Details</h2>
          <p className="text-gray-600">ID: {appointment._id}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 px-8 pt-6 pb-8 mb-4 bg-white border rounded-lg shadow-lg md:grid-cols-2">
          <div className="pb-2 border-b md:border-b-0 md:pb-0">
            <p className="mb-1 font-bold text-gray-700">First Name:</p>
            <p className="text-lg text-gray-900">{appointment.firstname}</p>
          </div>
          <div className="pb-2 border-b md:border-b-0 md:pb-0">
            <p className="mb-1 font-bold text-gray-700">Last Name:</p>
            <p className="text-lg text-gray-900">{appointment.lastname}</p>
          </div>
          <div className="pb-2 border-b md:border-b-0 md:pb-0">
            <p className="mb-1 font-bold text-gray-700">Trainer Name:</p>
            <p className="text-lg text-gray-900">{appointment.trainername}</p>
          </div>
          <div className="pb-2 border-b md:border-b-0 md:pb-0">
            <p className="mb-1 font-bold text-gray-700">Email:</p>
            <p className="text-lg text-gray-900 break-words">{appointment.email}</p>
          </div>
          <div className="pb-2 border-b md:border-b-0 md:pb-0">
            <p className="mb-1 font-bold text-gray-700">Phone:</p>
            <p className="text-lg text-gray-900">{appointment.phone}</p>
          </div>
          <div className="pb-2 border-b md:border-b-0 md:pb-0">
            <p className="mb-1 font-bold text-gray-700">Date:</p>
            <p className="text-lg text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="mb-1 font-bold text-gray-700">Time:</p>
            <p className="text-lg text-gray-900">{appointment.time}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link to={`/edittrainer/${id}`}>
            <button className="px-6 py-3 font-bold text-white transition-colors bg-orange-500 rounded-lg shadow-md hover:bg-orange-600">
              Edit Appointment
            </button>
          </Link>
          <button
            onClick={cancelAppointment}
            className="px-6 py-3 font-bold text-white transition-colors bg-red-500 rounded-lg shadow-md hover:bg-red-600"
          >
            Cancel Appointment
          </button>
          <Link to="/appform">
            <button className="px-6 py-3 font-bold text-gray-700 transition-colors bg-gray-200 rounded-lg shadow-md hover:bg-gray-300">
              Back to Appointments
            </button>
          </Link>
        </div>

        {/* Additional appointment info */}
        <div className="p-4 mt-6 rounded-lg bg-gray-50">
          <h3 className="mb-2 font-bold text-gray-700">Appointment Status</h3>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
            <span className="font-semibold text-green-700">Active</span>
          </div>
          {appointment.createdAt && (
            <p className="mt-2 text-sm text-gray-600">
              Created: {new Date(appointment.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default View;