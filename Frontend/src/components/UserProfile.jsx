import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = ({ username, fullName, email, onUpdateProfile, onDeleteProfile }) => {
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
          <button className="m-2 px-4 py-2 border rounded-md" onClick={onUpdateProfile}>Update Profile</button>
          <button className="m-2 px-4 py-2 border rounded-md" onClick={onDeleteProfile}>Delete Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
