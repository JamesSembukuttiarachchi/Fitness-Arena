import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuthContext } from "../hooks/useAuthContext";

const AppForm = () => {
  const { user } = useAuthContext();

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
    date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Invalid date"),
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
      alert("Appointment booked successfully");

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

      window.location.href = `/view/${appointmentId}`;
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Error: " + error.message);
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
      <div className="AppForm flex justify-center items-center h-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg p-6">
              <h1 className="mb-6 text-3xl font-bold text-black text-center">
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
                className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Confirm
              </button>
              {/* View appointment button */}
              <div className="mt-4 text-right">
                <Link to="/view">
                  <button className="py-3 px-6 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none">
                    View Appointment
                  </button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default AppForm;
