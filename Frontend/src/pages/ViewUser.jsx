import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";

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

  // Function to delete a user by id
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:6005/api/users/${userId}`);
      // After successful deletion, fetch users again to update the list
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
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
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.fullName}</td>
                  <td> {user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {/*<button
                      className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteUser(user._id)}
                    >
                      <FaRegTrashCan /> <span className="hidden">delete</span>
              </button>*/}

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button
                      className="btn bg-red-500 text-white font-bold hover:bg-red-600"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      <FaRegTrashCan/>
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
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => deleteUser(user._id)}>Confirm</button>
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
    </div>
  );
};

export default ViewUsers;
