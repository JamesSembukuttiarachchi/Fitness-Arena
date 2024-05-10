import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegister } from "../../hooks/useRegister";
import { FaRegTrashCan } from "react-icons/fa6";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { register, error, isLoading } = useRegister();
  const fullNameRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      role: "", // Adding role to form state
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
      role: Yup.string().required("Role is required"), // Role validation
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
        values.role, // Include role in the registration call
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

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:6005/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deleteUser = async (userId) => {
    try {
      console.log(userId);
      await axios.delete(`http://localhost:6005/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-users mt-4">
      <div className="users">
        <div className="flex flex-row mx-72 justify-between mb-10">
          <label className="input input-bordered flex items-center gap-2 w-full max-w-[500px]">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <button
            data-modal-target="crud-modal"
            onClick={toggleModal}
            className="btn bg-orange-500 hover:bg-orange-600 text-white"
          >
            Create User
          </button>
        </div>

        <center>
          <div className="overflow-x-auto pt-2 mb-4 pb-4">
            <table className="table w-3/4 outline-double">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-[17px] font-bold">Full Name</th>
                  <th className="text-[17px] font-bold">Username</th>
                  <th className="text-[17px] font-bold">Email</th>
                  <th className="text-[17px] font-bold">Role</th>
                  <th>
                    <div className="inline-block absolute 2xl:end-60 bottom-3 xl:bottom-auto">
                      <button className="flex items-center justify-end py-2 px-7 rounded-md bg-white print:hidden">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            className="pe-3"
                          >
                            <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                          </svg>
                        </span>
                        Print
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.fullName}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn btn-md bg-red-500 text-white font-bold hover:bg-red-600"
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${user._id}`)
                            .showModal()
                        }
                      >
                        <FaRegTrashCan />Delete
                      </button>
                      <dialog id={`my_modal_${user._id}`} className="modal">
                        <div className="modal-box bg-white">
                          <h3 className="font-bold text-lg">Delete User?</h3>
                          <p className="py-4">
                            This action permanently removes the user's account
                            and associated data.
                          </p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button
                                className="btn"
                                onClick={() => deleteUser(user._id)}
                              >
                                Confirm
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          <div
            id="crud-modal"
            className={`${
              showModal ? "fixed" : "hidden"
            } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen bg-gray-800 bg-opacity-75`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create a User
                  </h3>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="max-w-4xl bg-white shadow-md rounded-lg px-8 py-6 w-full md:w-3/4 lg:w-2/4 flex flex-col md:flex-row md:space-x-4">
                  <form onSubmit={formik.handleSubmit} className="flex-1">
                    <h3 className="text-3xl font-bold mb-6 text-center text-orange-500">
                      Register
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="fullName"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        ref={fullNameRef}
                        className={`shadow appearance-none border ${
                          formik.touched.fullName && formik.errors.fullName
                            ? "border-red-500"
                            : "border-gray-300"
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
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Username
                      </label>
                      <input
                        className={`shadow appearance-none border ${
                          formik.touched.username && formik.errors.username
                            ? "border-red-500"
                            : "border-gray-300"
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
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Email address
                      </label>
                      <input
                        className={`shadow appearance-none border ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-500"
                            : "border-gray-300"
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
                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Role
                      </label>
                      <select
                        className={`shadow appearance-none border ${
                          formik.touched.role && formik.errors.role
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="role"
                        {...formik.getFieldProps("role")}
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="pkgManager">Package Manager</option>
                        <option value="pmtManager">Payment Manager</option>
                        {/* Add more role options as needed */}
                      </select>
                      {formik.touched.role && formik.errors.role && (
                        <p className="text-red-500 text-xs italic">
                          {formik.errors.role}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        className={`shadow appearance-none border ${
                          formik.touched.password && formik.errors.password
                            ? "border-red-500"
                            : "border-gray-300"
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
                    <div className="flex items-center justify-center mt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        {isLoading ? "Registering..." : "Register"}
                      </button>
                    </div>
                    {error && (
                      <div className="text-red-500 text-xs italic text-center mt-4">
                        {error}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default ViewUsers;
