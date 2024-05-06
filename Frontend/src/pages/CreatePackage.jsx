import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/Admin/Header";

const CreatePackage = () => {
  const [values, setValues] = useState({
    packageID: "",
    packageType: "",
    packagePrice: 0,
    packageName: "",
    packageDescription: "",
    packagePerks: [],
    photoURL: "",
    validatePeriod: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "packagePerks") {
      // Splitting the value by commas to get an array of perks
      const perksArray = value.split(",");
      setValues({ ...values, [name]: perksArray });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6005/packages",
        values
      );
      console.log("Package added successfully:", response.data);

      const packageObjectID = response.data._id; // Extract objectID from the response
      // Send objectID to approval database
      await axios.post("http://localhost:6005/approval", {
        packageID: packageObjectID,
      });
      // Show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Package sent for Approval",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center mt-3">
        <h1 className="text-2xl font-bold">Create Package</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto shadow-lg p-8">
        <label className="block">
          <span className="text-gray-700">Package ID:</span>
          <input
            type="text"
            name="packageID"
            value={values.packageID}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Package Type:</span>
          <select
            name="packageType"
            value={values.packageType}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select</option>
            <option value="standard">Standard</option>
            <option value="promo">Promo</option>
          </select>
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Package Price:</span>
          <input
            type="number"
            name="packagePrice"
            value={values.packagePrice}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Package Name:</span>
          <input
            type="text"
            name="packageName"
            value={values.packageName}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Package Description:</span>
          <textarea
            name="packageDescription"
            value={values.packageDescription}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Package Perks:</span>
          <input
            type="text"
            name="packagePerks"
            value={values.packagePerks.join(",")} // Joining the array into a string with commas
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Photo URL:</span>
          <input
            type="text"
            name="photoURL"
            value={values.photoURL}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Validation Period:</span>
          <input
            type="number"
            name="validatePeriod"
            value={values.validatePeriod}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <button
          type="submit"
          className=" bg-orange hover:bg-orange mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default CreatePackage;
