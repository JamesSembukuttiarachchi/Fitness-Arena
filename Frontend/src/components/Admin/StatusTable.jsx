import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const StatusTable = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    fetchApprovals();

    const socket = io("http://localhost:6005");
    socket.on("approvalUpdate", () => {
      fetchApprovals();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchApprovals = async () => {
    try {
      const response = await axios.get("http://localhost:6005/approval");
      setApprovals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Package ID
              </th>
              <th scope="col" className="px-6 py-3">
                Package Name
              </th>
              <th scope="col" className="px-6 py-3">
                Package Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((approval) => (
              <tr
                key={approval._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {approval.packageID.packageID}
                </th>
                <td className="px-6 py-4">{approval.packageID.packageName}</td>
                <td className="px-6 py-4">{approval.packageID.packageType}</td>
                <td className="px-6 py-4">${approval.packageID.packagePrice}</td>
                <td className="px-6 py-4 text-right">
                  <div className="tooltip" data-tip="hello">
                    {/* Render approved button if status is approve */}
                    {approval.status === "approve" && (
                      <button
                        type="button"
                        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                        disabled
                      >
                        APPROVED
                      </button>
                    )}

                    {/* Render rejected button if status is approve */}
                    {approval.status === "reject" && (
                      <button
                        type="button"
                        className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                        disabled
                      >
                        REJECTED
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusTable;
