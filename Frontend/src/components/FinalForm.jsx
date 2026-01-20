import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import weightLoss from "/Weight loss workout schedule.jpg"

const FinalForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    bloodType: "",
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [bmi, setBmi] = useState();

  // Fetch user's biographic data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:6005/biodata/${id}`);
        const userData = response.data;
        setFormData(userData);
        setBmi(userData.bmi);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handCancel = async (e) => {
    e.preventDefault();
    // Show confirmation dialog before deleting
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
          // Implement form submission logic here to delete the data from the database
          const response = await axios.delete(
            `http://localhost:6005/biodata/${id}`
          );
          console.log("Data successfully deleted:", response.data);
          // Show SweetAlert for successful deletion
          Swal.fire({
            icon: "success",
            title: "Data Deleted Successfully!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Redirect or handle as needed
          });
        } catch (error) {
          console.error("Error deleting data:", error);
        }
      }
    });
  };
  const handleCancel = () => {
    setShowModal(false); // Close the modal
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement form submission logic here to update the data in the database
      const response = await axios.put(
        `http://localhost:6005/biodata/${id}`,
        formData
      );
      console.log("Data successfully updated:", response.data);
      // Close the modal after successful update
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className="flex flex-col items-center m-4 gap-8">
      <div>
        <ul className="steps">
          <li className="step"></li>
          <li className="step "></li>
          <li className="step step-primary"></li>
        </ul>
      </div>
      <div className="flex justify-center gap-4">
        {/* Card 1: User biodata */}
        <div className="w-80 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">User Biodata</h2>
          <p>Name: JameSon AglaWatta</p>
          <p>Age: {formData.age}</p>
          <p>Weight: {formData.weight}</p>
          <p>Height: {formData.height}</p>
          <p>BMI: {bmi}</p>
          <button
            onClick={() => setShowModal(true)} // Open the modal when clicked
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Update Details
          </button>
        </div>
        {/* Card 2: Workout schedule */}
        <div className="w-80 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Workout Schedule</h2>
          <img src={weightLoss}/>
        </div>

        
      </div>
      <div>
        <Link to="/tracker">
          <button className="btn bg-orange-500 hover:bg-orange-600">
            Confirm
          </button>
        </Link>
      </div>
      {/* Modal for updating details */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-5/12">
            <h2 className="text-xl font-semibold mb-4">Edit Your Biodata</h2>
            <form
              className="max-w-lg w-full flex flex-col justify-center mx-4"
              onSubmit={handleSubmit}
            >
              {/* Form inputs */}
              {/* Weight */}
              <div className="mb-4">
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Weight
                </label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  className="border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Height */}
              <div className="mb-4">
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700"
                >
                  Height
                </label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  className="border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Age */}
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className="border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Blood Type */}
              <div className="mb-4">
                <label
                  htmlFor="bloodType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blood Type
                </label>
                <select
                  name="bloodType"
                  id="bloodType"
                  className="border w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your blood type
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-between px-4 pb-4">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalForm;
