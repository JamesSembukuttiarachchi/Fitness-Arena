import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { Report, Text } from "react-report-builder";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:6005/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
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

  // Define report structure
  const reportData = {
    title: "Users List",
    data: filteredUsers,
    columns: [
      { label: "#", accessor: (user, index) => index + 1 },
      { label: "Full Name", accessor: "fullName" },
      { label: "Username", accessor: "username" },
      { label: "Email", accessor: "email" },
    ],
  };

  return (
    <div className="view-users">
      <h1>Users</h1>
      <div className="users">
        <label className="input input-bordered flex items-center gap-2">
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
        <div className="overflow-x-auto">
          <table className="table">
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
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.fullName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn bg-red-500 text-white font-bold hover:bg-red-600"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      <FaRegTrashCan />
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg">Delete User?</h3>
                        <p className="py-4">
                          This action permanently removes the user's account and
                          associated data.
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
      </div>

      {/* Button to generate report */}
      <button className="btn" onClick={() => reportData.show()}>
        Generate Report
      </button>

      {/* Report component */}
      <Report {...reportData}>
        {(user, index) => (
          <>
            <Text>{index + 1}</Text>
            <Text>{user.fullName}</Text>
            <Text>{user.username}</Text>
            <Text>{user.email}</Text>
          </>
        )}
      </Report>
    </div>
  );
};

export default ViewUsers;