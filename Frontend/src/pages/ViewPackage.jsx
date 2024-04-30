import React, { useState, useEffect } from "react";
import whiteTick from "../assets/whiteTick.png";
import axios from "axios";
import Header from "../components/Admin/Header";
import { FaPenToSquare } from "react-icons/fa6"
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

const ViewPackage = () => {
  const [plansData, setPlansData] = useState([]); // State to store plans data
  const [selectedPackage, setSelectedPackage] = useState(null); // State to store the selected package for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal open/close state

  useEffect(() => {
    // Fetch plans data from the server
    const fetchPlansData = async () => {
      try {
        const response = await axios.get("http://localhost:6005/packages");
        setPlansData(response.data);
      } catch (error) {
        console.error("Error fetching plans data:", error);
      }
    };

    fetchPlansData();
  }, []);

  // Function to handle opening the modal and setting the selected package
  const openModal = (packageID) => {
    const packageToEdit = plansData.find(
      (plan) => plan._id === packageID
    );
    setSelectedPackage(packageToEdit);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  
 // Function to handle saving changes to the package
 const saveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:6005/packages/${selectedPackage._id}`,
        selectedPackage
      );
      console.log("Changes saved successfully:", response.data);
      closeModal();
      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Package updated successfully",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };
  // Function to handle input change for package details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPackage({ ...selectedPackage, [name]: value });
  };

  return (
    <div>
        <Header/>
        <div className="flex flex-wrap justify-center gap-4 mt-5">
      {/*plans*/}
      {plansData.map((plan, i) => (
        <div className="bg-white rounded-lg shadow-md p-6 w-72" key={i}>
          <h2 className="text-lg font-bold mb-2">{plan.packageName}</h2>
          <div className="text-gray-600 mb-4">
            {plan.packagePerks.map((feature, j) => (
              <div className="flex items-center mb-1" key={j}>
                <img src={whiteTick} alt="" className="w-4 mr-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700 font-semibold">
              ${plan.packcagePrice}
            </span>
            <div></div>
            <button
              className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => openModal(plan._id)}
            >
                <FaPenToSquare/>
              Edit
            </button>
            <button
              className="btn btn-error  text-white px-4 py-2 rounded-lg"
              
            >
                <FaTrash/>
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Package</h2>
            <div className="text-gray-600 mb-4">
              <div className="flex items-center mb-2">
                <span className="mr-2">Package Name:</span>
                <input
                  type="text"
                  name="packageName"
                  value={selectedPackage.packageName}
                  onChange={handleInputChange}
                  className="border border-gray-400 px-2 py-1 rounded"
                />
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-2">Validation Period:</span>
                <input
                  type="text"
                  name="validatePeriod"
                  value={selectedPackage.validatePeriod}
                  onChange={handleInputChange}
                  className="border border-gray-400 px-2 py-1 rounded"
                />
              </div>
              {/* Input fields for editing package perks */}
              {selectedPackage.packagePerks.map((perk, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <span className="mr-2">{`Perk ${index + 1}:`}</span>
                  <input
                    type="text"
                    value={perk}
                    onChange={(e) => handlePerksChange(index, e)}
                    className="border border-gray-400 px-2 py-1 rounded"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                onClick={saveChanges}
              >
                Save Changes
              </button>
              <button
                className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default ViewPackage;
