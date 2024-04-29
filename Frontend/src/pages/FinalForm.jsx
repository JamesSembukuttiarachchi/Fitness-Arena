import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const FinalForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    bloodType: "",
  });

  // Fetch user's biographic data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:6005/biodata/${id}`);
        const userData = response.data;
        setFormData(userData);
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

  const handleCancel = async (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement form submission logic here to update the data in the database
      const response = await axios.put(
        `http://localhost:6005/biodata/${id}`,
        formData
      );
      console.log("Data successfully updated:", response.data);
      // Show SweetAlert for successful update
      Swal.fire({
        icon: "success",
        title: "Data Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Redirect or handle as needed
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center m-4 gap-8">
        <div>
          <ul className="steps">
            <li className="step"></li>
            <li className="step"></li>
            <li className="step step-primary"></li>
            
          </ul>
        </div>

        <div>
          <h1 className="text-3xl font-sans font-bold">Your Selected Data</h1>
        </div>
        <div className="shadow-2xl p-8 rounded-md">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            {/* Your form inputs */}
            {/* Weight */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="weight"
                id="weight"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=""
                value={formData.weight}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="weight"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-oranborder-orange-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Weight
              </label>
            </div>
            {/* Height */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="height"
                id="height"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                value={formData.height}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="height"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-oranborder-orange-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Height
              </label>
            </div>
            {/* Age */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="age"
                id="age"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
                value={formData.age}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="age"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-oranborder-orange-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Age
              </label>
            </div>
            {/* Blood Type */}
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="bloodType"
                  id="bloodType"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                  required
                  value={formData.bloodType}
                  onChange={handleChange}
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
                <label
                  htmlFor="bloodType"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-oranborder-orange-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Blood type
                </label>
              </div>
            </div>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="mr-4 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="ml-4 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinalForm;
