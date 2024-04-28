import React from "react";

const PaymentTransaction = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container p-10 mx-auto">
        <h1 className="text-4xl font-bold text-gray-700 mb-6">
          Financial Statements
        </h1>
        <div>
          <h3 className="text-lg font-semibold">Total Profit for this month</h3>
          <p className="text-5xl mb-6">2,550.53</p>

          {/* Add the search bar here */}
          <form class="max-w-md mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search ..."
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2 bg-white mb-6 border-2 p-6 rounded-md">
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">Income</p>
              <p className="text-5xl font-semibold text-green-500">1,045.50</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold">Expenses</p>
              <p className="text-5xl font-semibold text-red-500">623.50</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              History
            </h2>
            <div className="flex justify-between border-2 p-4 bg-white rounded-md mb-6">
              <p className="text-md">Transaction from Order #12345</p>
              <div className="flex space-x-4 items-center">
                <p className="text-lg">$10.00</p>
                <div className="flex space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <form className="my-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Add new transaction
              </h2>
              <div className="flex justify-between bg-white items-center border-2 rounded-md p-4 mb-6">
                <div className="md:p-4 py-2 px-2 w-2/3">
                  <p className="text-md">Description</p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="New shiny thing"
                      className="p-2 w-full border-2 rounded-md outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="md:p-4 py-2 px-2">
                  <p className="text-md">Value</p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="100.00"
                      className="p-2 border-2 w-full rounded-md outline-none"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-2 space-x-2">
                <button className="text-md bg-red-500 px-5 py-2 rounded-md text-white">
                  Cancel
                </button>
                {/* <span className="text-lg font-semibold">Or</span> */}
                <button className="text-md bg-green-500 px-8 py-2 rounded-md text-white">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTransaction;
