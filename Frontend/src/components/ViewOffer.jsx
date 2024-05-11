import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ViewOffer = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedOfferData, setUpdatedOfferData] = useState({
    name: "",
    description: "",
  });

  // Fetch offer data from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:6005/offer")
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, []);

  // Function to handle update button click
  const handleUpdateClick = (offer) => {
    setSelectedOffer(offer);
    setUpdatedOfferData({
      name: offer.name,
      description: offer.description,
    });
    setIsModalOpen(true);
  };

  // Function to handle input change in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOfferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission in the modal
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:6005/offer/${selectedOffer._id}`,
        updatedOfferData
      );
      setIsModalOpen(false);
      // Optionally, you can refetch the offer data after successful update
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Offer updated successfully!",
      });
    } catch (error) {
      console.error("Error updating offer:", error);
      // Optionally, show an error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update offer. Please try again.",
      });
    }
  };

  // Function to handle delete button click
  const handleDeleteClick = (offer) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:6005/offer/${offer._id}`);
          // Optionally, you can refetch the offer data after successful deletion
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Offer deleted successfully!",
          });
        } catch (error) {
          console.error("Error deleting offer:", error);
          // Optionally, show an error message
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete offer. Please try again.",
          });
        }
      }
    });
  };

  // Function to extract file name from photoURL
  const extractFileName = (image) => {
    return image.split("\\").pop(); // Split the string by backslash and get the last element
  };
  return (
    <div>
      <div className="flex justify-between">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="w-[384px]">
              <img
                className="rounded-t-lg"
                src={`http://localhost:6005/offers/${extractFileName(
                  offer.image
                )}`} // Assuming photo is stored as a URL in the offer object
                alt={offer.name}
              />
            </div>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {offer.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {offer.description}
              </p>
              <button
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleUpdateClick(offer)}
              >
                Update
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
              <button
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ml-2"
                onClick={() => handleDeleteClick(offer)}
              >
                Delete
                <svg
                  className="w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 w-2/3 max-w-md rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Update Offer</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedOfferData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-md py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block font-semibold mb-1"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={updatedOfferData.description}
                  onChange={handleInputChange}
                  className="w-full border rounded-md py-2 px-3"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md ml-2 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOffer;
