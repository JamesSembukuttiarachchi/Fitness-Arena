import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewUsers = () => {
  // State to store users data
  const [users, setUsers] = useState([]);

  // Function to fetch users data from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:6005/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
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
        {users.map((user, index) => (
          <div key={user._id} className="user">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Full name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>{index + 1}</th>
                    <td>{user.fullName}</td>
                    <td> {user.username}</td>
                    <td>{user.email}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUsers;
