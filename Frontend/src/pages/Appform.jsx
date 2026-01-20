import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";

const AppForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user || !user.token) {
      Swal.fire({
        icon: "warning",
        title: "Authentication Required",
        text: "Please log in to book an appointment",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [user, navigate]);

  const initialValues = {
    firstname: "",
    lastname: "",
    trainername: "",
    email: user?.email || "", // Pre-fill with user's email if available
    phone: "",
    date: new Date(),
    time: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .required("First Name is required"),
    lastname: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .required("Last Name is required"),
    trainername: Yup.string()
      .min(2, "Trainer name must be at least 2 characters")
      .max(100, "Trainer name cannot exceed 100 characters")
      .required("Trainer's Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format")
      .min(10, "Phone number must be at least 10 digits")
      .required("Contact Number is required"),
    date: Yup.date()
      .min(new Date(), "Date cannot be in the past")
      .required("Date is required"),
    time: Yup.string().required("Time is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (!user || !user.token) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "You must be logged in to book an appointment",
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      // Format date properly
      const formattedDate = `${values.date.getFullYear()}-${(
        values.date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${values.date.getDate().toString().padStart(2, "0")}`;

      const appointment = {
        firstname: values.firstname.trim(),
        lastname: values.lastname.trim(),
        trainername: values.trainername.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        date: formattedDate,
        time: values.time,
      };

      // ✅ Send request with proper Authorization header
      const response = await axios.post(
        "http://localhost:6005/appointmentsbook/",
        appointment,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Appointment Booked Successfully!",
        text: `Appointment ID: ${response.data._id}`,
        showConfirmButton: true,
        confirmButtonText: "View Appointment",
      });

      // Reset form after successful submission
      resetForm();
      
      // Navigate to the specific appointment view
      navigate(`/viewtrainer/${response.data._id}`);
      
    } catch (error) {
      console.error("Error booking appointment:", error);
      
      let errorMessage = "Failed to book appointment";
      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please log in again.";
        // Optionally logout user
        navigate("/login");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  // Don't render form if user is not authenticated
  if (!user || !user.token) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Authentication Required</h2>
            <p className="mb-4">Please log in to book an appointment</p>
            <Link to="/login" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              Login
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-full AppForm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
              <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
                Book an Appointment
              </h1>

              <div className="flex gap-3">
                <div className="flex-1 mb-4">
                  <label className="block mb-1 font-semibold">First Name:</label>
                  <Field
                    type="text"
                    name="firstname"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstname && touched.firstname ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="First Name"
                    onKeyPress={handleKeyPress}
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="block mb-1 font-semibold">Last Name:</label>
                  <Field
                    type="text"
                    name="lastname"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastname && touched.lastname ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Last Name"
                    onKeyPress={handleKeyPress}
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Trainer's Name:</label>
                <Field
                  type="text"
                  name="trainername"
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.trainername && touched.trainername ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Trainer's Name"
                  onKeyPress={handleKeyPress}
                />
                <ErrorMessage
                  name="trainername"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1 mb-4">
                  <label className="block mb-1 font-semibold">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="block mb-1 font-semibold">Contact Number:</label>
                  <Field
                    type="tel"
                    name="phone"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Contact Number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 mb-4">
                  <label className="block mb-1 font-semibold">Date:</label>
                  <DatePicker
                    selected={values.date}
                    onChange={(date) => setFieldValue("date", date)}
                    minDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.date && touched.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="block mb-1 font-semibold">Time:</label>
                  <Field
                    type="time"
                    name="time"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.time && touched.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 text-white rounded transition-colors ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 focus:bg-blue-700'
                }`}
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </button>

              <Link
                to="/viewtrainer"
                className="block mt-4 text-center text-blue-500 hover:underline"
              >
                View My Appointments
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default AppForm;