import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

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
    <div class="max-w-lg mx-auto flex flex-col items-center border border-gray-400 rounded-md p-4">
      <div class="m-4">
        <FaUserCircle className="w-20 h-20 text-gray-500" />
      </div>
      <div class="m-4">
        <div class="flex flex-col justify-center items-center">
          <div class="mb-2">
            <strong> {fullName}</strong>
          </div>
          <div class="mb-2">
            <strong>{username}</strong>
          </div>
          <div class="mb-2">{email}</div>
        </div>
        <div class="flex justify-center gap-4">
          <button class="btn btn-sm bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-center">
            <FaEdit /> Update Profile
          </button>
          <button class="btn btn-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline text-center">
            <FaRegTrashCan /> Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
