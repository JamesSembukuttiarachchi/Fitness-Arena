import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DocAppList from "../components/DocAppList";
import PhysioAppList from "../components/PhysioAppList";

const AppHistory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to a default route when the component mounts
    navigate("/apphistory/phyapp", { replace: true });
  }, []);
  return (
    <div>
      <div className="px-4 sm:px-10 mt-10">
        <div>
          <h2 className="text-2xl font-bold">My Bookings</h2>
        </div>

        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            class="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="default-styled-tab"
            data-tabs-toggle="#default-styled-tab-content"
            data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
            data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
            role="tablist"
          >
            <li class="me-2" role="presentation">
              <Link to="/apphistory/phyapp">
                <button
                  class="inline-block p-4 border-b-2 rounded-t-lg"
                  id="profile-styled-tab"
                  data-tabs-target="#styled-profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Physiotherapy Appointments
                </button>
              </Link>
            </li>
            <li class="me-2" role="presentation">
              <Link to="/apphistory/docapp">
                <button
                  class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="dashboard-styled-tab"
                  data-tabs-target="#styled-dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Doctor Appointments
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <Outlet>
          <PhysioAppList path="/phyapp" />
        </Outlet>
      </div>
    </div>
  );
};

export default AppHistory;
