import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert2";
import Header from "../components/Admin/Header";

const CreatePackage = () => {
  const initialValues = {
    packageID: "",
    packageType: "",
    packagePrice: 0,
    packageName: "",
    packageDescription: "",
    packagePerks: [],
    photoURL: "",
    validatePeriod: 0,
  };

  const validationSchema = Yup.object().shape({
    packageID: Yup.string().required("Package ID is required"),
    packageType: Yup.string().required("Package Type is required"),
    packagePrice: Yup.number()
      .required("Package Price is required")
      .positive("Package Price must be positive"),
    packageName: Yup.string()
      .matches(/^[a-zA-Z0-9\s]*$/, "Package Name must contain only alphanumeric characters and spaces")
      .required("Package Name is required"),
    packageDescription: Yup.string().required("Package Description is required"),
    packagePerks: Yup.array()
      .of(Yup.string())
      .required("Package Perks are required"),
    photoURL: Yup.string().required("Photo URL is required"),
    validatePeriod: Yup.number()
      .required("Validation Period is required")
      .positive("Validation Period must be positive"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:6005/packages",
        values
      );
      console.log("Package added successfully:", response.data);
      // Show success message
      swal("Success", "Package added successfully!", "success");
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="max-w-lg mx-auto shadow-lg p-8">
            <label className="block">
              <span className="text-gray-700">Package ID:</span>
              <Field
                type="text"
                name="packageID"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="packageID" component="div" className="text-red-500" />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Package Type:</span>
              <Field
                as="select"
                name="packageType"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select</option>
                <option value="standard">Standard</option>
                <option value="promo">Promo</option>
              </Field>
              <ErrorMessage name="packageType" component="div" className="text-red-500" />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Package Price:</span>
              <Field
                type="number"
                name="packagePrice"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="packagePrice" component="div" className="text-red-500" />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Package Name:</span>
              <Field
                type="text"
                name="packageName"
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (
                    !(
                      (charCode >= 65 && charCode <= 90) || // A-Z
                      (charCode >= 97 && charCode <= 122) || // a-z
                      (charCode >= 48 && charCode <= 57) || // 0-9
                      charCode === 32 // Space
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="packageName" component="div" className="text-red-500" />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Package Description:</span>
              <Field
                as="textarea"
                name="packageDescription"
                rows={4}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="packageDescription" component="div" className="text-red-500" />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Package Perks:</span>
              <Field
                type="text"
                name="packagePerks"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="packagePerks" component="div" className="text-red-500" />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Photo URL:</span>
              <Field
                type="text"
                name="photoURL"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="photoURL" component="div" className="text-red-500" />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Validation Period:</span>
              <Field
                type="number"
                name="validatePeriod"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="validatePeriod" component="div" className="text-red-500" />
            </label>

            <button
              type="submit"
              className=" bg-orange hover:bg-orange mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Package
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePackage;
