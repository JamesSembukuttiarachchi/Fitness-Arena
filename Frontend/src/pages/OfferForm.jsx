import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const OfferForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    category: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post("http://localhost:6005/offer/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Optionally, reset the form fields after successful submission
      setFormData({
        name: "",
        discount: "",
        category: "",
        description: "",
        image: null,
      });
      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Offer created successfully!",
        timer: 2000, // Automatically close after 2 seconds
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error creating offer:", error);
      // Optionally, show an error message
      alert("Failed to create offer. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: imageFile,
    }));
  };

  return (
    <form
      className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4">Create New Offer</h2>
      <div className="mb-4 flex flex-wrap">
        <div className="w-full md:w-1/2 md:pr-2">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Offer Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter offer name"
            required
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-2">
          <label
            htmlFor="discount"
            className="block text-gray-700 font-semibold mb-2"
          >
            Discount
          </label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter discount"
            required
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 md:pl-2">
        <label
          htmlFor="category"
          className="block text-gray-700 font-semibold mb-2"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">Select category</option>
          <option value="gympkg">Gym Package</option>
          <option value="appt">Appointment</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter description"
          rows={4}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-gray-700 font-semibold mb-2"
        >
          Photo URL
        </label>
        <input
          type="file"
          accept="image/*"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter photo URL"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Create Offer
      </button>
    </form>
  );
};

export default OfferForm;
