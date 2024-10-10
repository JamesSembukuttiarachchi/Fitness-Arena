import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";  // Import SweetAlert2

const AppForm = () => {
  const [userId, setUserId] = useState();
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
  }, [user]); // Added user dependency to avoid warnings

  const initialValues = {
    firstname: "",
    lastname: "",
    trainername: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
      .required("First Name is required"),
    lastname: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
      .required("Last Name is required"),
    trainername: Yup.string().required("Trainer's Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Contact Number is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.string().required("Time is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedDate = `${values.date.getFullYear()}-${(
        values.date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${values.date
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      const appointment = {
        ...values,
        date: formattedDate,
        time: values.time.toString(),
      };

      const response = await axios.post(
        "http://localhost:6005/appointmentsbook/",
        appointment
      );
      const appointmentId = response.data._id;

      // Show success SweetAlert
      Swal.fire({
        icon: "success",
        title: "Appointment booked successfully",
        showConfirmButton: false,
        timer: 1500,
      });

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

      // Redirect to the appointment view page
      setTimeout(() => {
        window.location.href = `/viewtrainer/${appointmentId}`;
      }, 1600);
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Show error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Failed to book appointment",
        text: `Error: ${error.message}`,
      });
    }
    setSubmitting(false);
  };

  const handleKeyPress = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-full AppForm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg p-6">
              <h1 className="mb-6 text-3xl font-bold text-center text-black">
                Booking an appointment
              </h1>
              {/* Input fields */}
              <div className="flex gap-3">
                <div className="mb-4">
                  <label htmlFor="firstname" className="block mb-1">
                    First Name:
                  </label>
                  <Field
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="First Name"
                    onKeyPress={handleKeyPress}
                    pattern="[A-Za-z]*"
                    title="Only letters are allowed"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastname" className="block mb-1">
                    Last Name:
                  </label>
                  <Field
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Last Name"
                    onKeyPress={handleKeyPress}
                    pattern="[A-Za-z]*"
                    title="Only letters are allowed"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1">
                    Email:
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block mb-1">
                    Contact Number:
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Contact Number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="trainername" className="block mb-1">
                  Trainer's Name:
                </label>
                <Field
                  type="text"
                  id="trainername"
                  name="trainername"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Trainer's Name"
                  onKeyPress={handleKeyPress}
                />
                <ErrorMessage
                  name="trainername"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-between gap-3">
                {/* Date picker */}
                <div className="mb-4">
                  <label htmlFor="date" className="block mb-1">
                    Date:
                  </label>
                  <Field name="date">
                    {({ field }) => (
                      <DatePicker
                        {...field}
                        selected={field.value}
                        minDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        id="date"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {/* Time input */}
                <div className="mb-4">
                  <label htmlFor="time" className="block mb-1">
                    Time:
                  </label>
                  <Field
                    type="time"
                    id="time"
                    name="time"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* Confirm button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Book Appointment
              </button>
              {/* Link back to appointment page */}
              <Link
                to="/viewappointment"
                className="block mt-4 text-center text-blue-500 hover:underline"
              >
                View Appointments
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default AppForm;
