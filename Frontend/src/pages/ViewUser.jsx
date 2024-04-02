import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewUser from './ViewUser'; // Assuming WorkoutDetails component is defined elsewhere

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
      <div className="users">
        {users.map((user) => (
          <ViewUser key={user._id} user={user} /> 
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;
