// ViewUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUsers = () => {
  // State to store users data
  const [users, setUsers] = useState([]);

  // Function to fetch users data from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:6005/api/users'); 
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="view-users">
      <h1>Users</h1>
      <div className="users">
        {users.map((user) => (
          <div key={user._id} className="user">
            <h2>{user.fullName}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* You can add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;
