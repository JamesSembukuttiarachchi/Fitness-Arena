import React, { useState, useEffect } from "react";
import axios from "axios";

const Approval = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const response = await axios.get("http://localhost:6005/approval");
      setApprovals(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:6005/approval/${id}`, {
        status: "approve",
      });
      // Update the status in the local state to re-render the UI
      setApprovals((prevApprovals) =>
        prevApprovals.map((approval) =>
          approval._id === id ? { ...approval, status: "approve" } : approval
        )
      );
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:6005/approval/${id}`, {
        status: "reject",
      });
      // Update the status in the local state to re-render the UI
      setApprovals((prevApprovals) =>
        prevApprovals.map((approval) =>
          approval._id === id ? { ...approval, status: "reject" } : approval
        )
      );
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  return (
    <div className="m-10">
    <div className="container mx-auto px-4 grid grid-cols-3 grid-rows-2">
      {approvals.map((approval) => (
        <div
          key={approval._id}
          className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400 uppercase">
            {approval.packageID.packageType} plan - {approval.packageID.packageName}
          </h5>
          <div className="flex items-baseline text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">
              {approval.packageID.packagePrice}
            </span>
            <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
              - {approval.packageID.validatePeriod} month
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            {/* Map over package perks and display them */}
            {approval.packageID.packagePerks.map((perk, index) => (
              <li key={index} className="flex items-center">
                {/* You can adjust the icon or style as needed */}
                <svg
                  className="flex-shrink-0 w-4 h-4 text-norange dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {perk}
                </span>
              </li>
            ))}
          </ul>
          {/* Render different buttons based on the status */}
          {approval.status == "pending" && (
            <div className="flex flex-col gap-2 md:flex-row">
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                onClick={() => handleApprove(approval._id)}
              >
                APPROVE
              </button>
              <button
                type="button"
                onClick={() => handleReject(approval._id)}
                className="text-white bg-gray-400 hover:bg-dGray focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
              >
                REJECT
              </button>
            </div>
          )}

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
      ))}
    </div>
    </div>
  );
};

export default Approval;
