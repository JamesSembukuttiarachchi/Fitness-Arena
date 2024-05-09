import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom"; // Import Link for navigation
import * as Yup from "yup";
import { useLogin } from "../hooks/useLogin";
import loginImage from "../assets/login-image.png";

const Login = () => {
  const { login, error, isLoading } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex justify-center items-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${loginImage})`,
          }}
        ></div>
        <form
          className="login bg-white shadow-md rounded-lg px-12 py-10 w-96 z-10"
          onSubmit={formik.handleSubmit}
        >
          <h3 className="text-3xl font-bold mb-6 text-center text-orange-500">
            Log In
          </h3>

          <div className="mb-6">
            <label
              className="block text-black-700 text-sm font-bold mb-2"
              htmlFor="email"
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
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
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
            {error && <div className="error">{error}</div>}
          </div>
          {/* "Don't have an account" link */}
          <div className="text-center">
            <Link
              to="/register"
              className="text-gray-600 hover:text-gray-800 font-bold text-sm"
            >
              Don't have an account? Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
