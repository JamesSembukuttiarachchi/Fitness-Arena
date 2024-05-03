import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const UserProfile = ({}) => {

  const [username, setUsername] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
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
        setUsername(data.username);
        setFullName(data.fullName);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("An error occurred while fetching user data.");
      }
    };

    if (user) {
      fetchUserId();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <div className="m-4">
        <FaUserCircle className="w-20 h-20 text-gray-500" />
      </div>
      <div className="m-4">
        <h2>User Profile</h2>
        <div className="flex flex-col">
          <div className="mb-2">
            <strong>Username:</strong> {username}
          </div>
          <div className="mb-2">
            <strong>Full Name:</strong> {fullName}
          </div>
          <div className="mb-2">
            <strong>Email Address:</strong> {email}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="m-2 px-4 py-2 border rounded-md"
           
          >
            Update Profile
          </button>
          <button
            className="m-2 px-4 py-2 border rounded-md"
           
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
