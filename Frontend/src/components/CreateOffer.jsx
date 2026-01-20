import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import OfferForm from "../pages/OfferForm";

const CreateOffer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("offerform");

  useEffect(() => {
    // Redirect to a default route when the component mounts
    navigate("/create/offerform", { replace: true });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
              <Link to="/create/offerform">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "offerform"
                      ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                      : "text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                  }`}
                  onClick={() => handleTabClick("offerform")}
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === "offerform"}
                >
                  Create offer
                </button>
              </Link>
            </li>
            <li class="me-2" role="presentation">
              <Link to="/create/viewoffer">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "viewoffer"
                      ? "text-orange-600 border-orange-600 dark:text-orange-500 dark:border-orange-500"
                      : "text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                  }`}
                  onClick={() => handleTabClick("viewoffer")}
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected={activeTab === "viewoffer"}
                >
                  View creted offers
                </button>
              </Link>
            </li>
          </ul>
        </div>

        <Outlet>
          <OfferForm path="/offerform"/>
        </Outlet>
      </div>
    </div>
  );
};

export default CreateOffer;
