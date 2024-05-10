import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const contentRef = useRef(null);

  const handleDownload = () => {
    const content = contentRef.current;

    html2canvas(content, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgHeight = (canvas.height * 208) / canvas.width;
      pdf.addImage(imgData, 0, 0, 208, imgHeight);
      pdf.save("user_report.pdf");
    });
  };

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
    <div className="view-users">
      <div className="users">
        <center>
          <label className="input input-bordered flex items-center gap-2 max-w-[500px]">
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
        </center>

        <center>
          <div ref={contentRef} className="overflow-x-auto">
            <table className="table w-3/4">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-[17px] font-bold">Full name</th>
                  <th className="text-[17px] font-bold">Username</th>
                  <th className="text-[17px] font-bold">Email</th>
                  <th>
                    <div className="inline-block absolute 2xl:end-60 bottom-3 xl:bottom-auto">
                      <button
                        onClick={handleDownload}
                        className="flex items-center justify-end py-2 px-7 rounded-md bg-white print:hidden"
                      >
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
                    <td>
                      <button
                        className="btn bg-red-500 text-white font-bold hover:bg-red-600"
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${user._id}`)
                            .showModal()
                        }
                      >
                        <FaRegTrashCan />
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
        </center>
      </div>
    </div>
  );
};

export default ViewUsers;