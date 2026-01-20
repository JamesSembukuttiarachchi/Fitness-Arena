import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const BioData = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    weight: Yup.number()
      .positive("Weight must be a positive number")
      .required("Weight is required"),
    height: Yup.number()
      .positive("Height must be a positive number")
      .required("Height is required"),
    age: Yup.number()
      .positive("Age must be a positive number")
      .required("Age is required"),
    bloodType: Yup.string().required("Blood type is required"),
  });

  const formik = useFormik({
    initialValues: {
      weight: "",
      height: "",
      age: "",
      bloodType: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          "http://localhost:6005/biodata",
          values
        );
        console.log("Data successfully posted:", response.data);
        const { _id } = response.data;
        navigate(`/select/goal/${_id}`);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    },
  });

  const handleNumbersKeyPress = (e) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className="flex flex-col items-center m-4 gap-8">
      {" "}
      <div>
        <ul className="steps">
          <li className="step step-warning"></li>
          <li className="step"></li>
          <li className="step"></li>
        </ul>
      </div>
      <div>
        <h1 className="text-3xl font-sans font-bold">Enter Biographic Data</h1>
      </div>
      <div className="shadow-2xl p-8 rounded-md">
        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
          {/* Weight */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="weight"
              id="weight"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=""
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyPress={handleNumbersKeyPress}
              required
            />
            {formik.touched.weight && formik.errors.weight ? (
              <div className="text-red-500">{formik.errors.weight}</div>
            ) : null}
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
              value={formik.values.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyPress={handleNumbersKeyPress}
              required
            />
            {formik.touched.height && formik.errors.height ? (
              <div className="text-red-500">{formik.errors.height}</div>
            ) : null}
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
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyPress={handleNumbersKeyPress}
              required
            />
            {formik.touched.age && formik.errors.age ? (
              <div className="text-red-500">{formik.errors.age}</div>
            ) : null}
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
                value={formik.values.bloodType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              {formik.touched.bloodType && formik.errors.bloodType ? (
                <div className="text-red-500">{formik.errors.bloodType}</div>
              ) : null}
              <label
                htmlFor="bloodType"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-oranborder-orange-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Blood type
              </label>
            </div>
          </div>

          {/* Back Button */}
          <Link to="/workoutform" className="mr-4">
            <button className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Back
            </button>
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            className=" ml-4 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BioData;
