import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { register, error, isLoading } = useRegister();
  const fullNameRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, {
          message: "Only letters and spaces are allowed",
          excludeEmptyString: true,
        })
        .test(
          "two-names",
          "Full name must contain at least two names separated by a space",
          (value) => {
            return value.split(" ").filter(Boolean).length >= 2;
          }
        )
        .required("Full Name is required"),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, {
          message: "Only letters and numbers are allowed",
          excludeEmptyString: true,
        })
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(/^[^\s]*$/, {
          message: "Email should not contain spaces",
          excludeEmptyString: true,
        })
        .required("Email address is required"),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z!@#$%^&*()_+]).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      await register(
        values.fullName,
        values.username,
        values.email,
        values.password
      );
    },
  });

  // Function to handle key press event for the full name input
  const handleKeyPress = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-12 py-10 w-96">
        <h3 className="text-3xl font-bold mb-6 text-center">Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name:
            </label>
            <input
              ref={fullNameRef}
              className={`shadow appearance-none border ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-500"
                  : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="fullName"
              type="text"
              placeholder="Full Name"
              {...formik.getFieldProps("fullName")}
              onKeyPress={handleKeyPress} // Call handleKeyPress function on key press
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.fullName}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              className={`shadow appearance-none border ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.username}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email address:
            </label>
            <input
              className={`shadow appearance-none border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              placeholder="Email address"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              className={`shadow appearance-none border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs italic">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="mx-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;