import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import Swal from "sweetalert2";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    const fetchUserData = async () => {
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
        setUsername(data.username);
        setFullName(data.fullName);
        setEmail(data.email);
        setId(data._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("User ID:", id); // Print the user ID to the console
    try {
      const response = await fetch(
        `http://localhost:6005/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            username,
            fullName,
            email,
            password, // You may want to include password only if it's changed
          }),
        }
      );
      if (response.ok) {
        // Profile updated successfully
        // Show success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500, // Close alert after 1.5 seconds
        });
        toggleModal(); // Close the modal after successful update
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("Error updating profile:", errorData.message);
        // You may want to show an error message to the user
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // You may want to show an error message to the user
    }
  };


  const handleDeleteProfile = async () => {
    // Show confirmation dialog before deleting the profile
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:6005/api/users/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.ok) {
          // Profile deleted successfully
          // You may want to redirect the user or perform any other action
          console.log("Profile deleted successfully");
          logout(); // Assuming you have a logout function in useAuthContext to clear the authentication state
          // Navigate to the register page
          navigate("/register");
        } else {
          // Handle error response
          const errorData = await response.json();
          console.error("Error deleting profile:", errorData.message);
          // You may want to show an error message to the user
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
        // You may want to show an error message to the user
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center border border-gray-400 rounded-md p-4">
      <div className="m-4">
        <FaUserCircle className="w-20 h-20 text-gray-500" />
      </div>
      <div className="m-4">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2">
            <strong>{fullName}</strong>
          </div>
          <div className="mb-2">
            <strong>{username}</strong>
          </div>
          <div className="mb-2">{email}</div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            data-modal-target="crud-modal"
            onClick={toggleModal}
            className="btn btn-sm bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-center"
          >
            <FaEdit /> Update Profile
          </button>
          <button onClick={handleDeleteProfile} className="btn btn-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-center">
            <FaTrash /> Delete Profile
          </button>
        </div>
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
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update your profile
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

            <form onSubmit={handleUpdateProfile} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-1">
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={`Current: ${fullName}`}
                  required
                />
              </div>
              <div className="grid gap-4 mb-4 grid-cols-1">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={`Current: ${username}`}
                  required
                />
              </div>
              <div className="grid gap-4 mb-4 grid-cols-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={`Current: ${email}`}
                  required
                />
              </div>
              <div className="grid gap-4 mb-4 grid-cols-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your new password"
                />
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
