import React, { useState } from "react";
import axios from "axios";

const CreatePackage = () => {
  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6005/packages",
        formData
      );
      console.log("Package added successfully:", response.data);
      // Reset form fields after successful submission
      setFormData({
        packageID: "",
        packageType: "",
        packagePrice: 0,
        packageName: "",
        packageDescription: "",
        packagePerks: [],
        photoURL: "",
        validatePeriod: 0,
      });
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto shadow-lg p-8">
      <label className="block">
        <span className="text-gray-700">Package ID:</span>
        <input
          type="text"
          name="packageID"
          value={formData.packageID}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Package Type:</span>
        <select
          name="packageType"
          value={formData.packageType}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
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
          value={formData.packagePrice}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Package Name:</span>
        <input
          type="text"
          name="packageName"
          value={formData.packageName}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Package Description:</span>
        <textarea
          name="packageDescription"
          value={formData.packageDescription}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Package Perks:</span>
        <input
          type="text"
          name="packagePerks"
          value={formData.packagePerks}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Photo URL:</span>
        <input
          type="text"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </label>
      <label className="block mt-4">
        <span className="text-gray-700">Validation Period:</span>
        <input
          type="number"
          name="validatePeriod"
          value={formData.validatePeriod}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </label>
      <button
        type="submit"
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Package
      </button>
    </form>
  );
};

export default CreatePackage;
