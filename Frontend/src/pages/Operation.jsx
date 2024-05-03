import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Admin/Header";

const Operation = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <div className="my-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Gym Dashboard</h1>
          <p className="text-lg mb-6">Manage your gym packages here.</p>
          <div className="flex justify-between">
            <Link
              to="/create-package"
              className="bg-orange hover:bg-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Package
            </Link>
            <Link
              to="/view-packages"
              className="bg-gray hover:bg-gray text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              View Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operation;
