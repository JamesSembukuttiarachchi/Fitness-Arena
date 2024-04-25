import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutUpdateForm = ({ workout, onClose }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: workout.title,
      load: workout.load,
      reps: workout.reps,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Exercise Title is required")
        .matches(/^[a-zA-Z\s]*$/, {
          message: "Only letters and spaces are allowed",
          excludeEmptyString: true,
        }),
      load: Yup.number()
        .required("Load is required")
        .positive("Load must be a positive number"),
      reps: Yup.number()
        .required("Reps are required")
        .positive("Reps must be a positive number"),
    }),
    onSubmit: async (values) => {
      if (!user) {
        setError("You must be logged in");
        return;
      }

      const updatedWorkout = { ...values };

      const response = await fetch(
        `http://localhost:6005/api/workouts/${workout._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedWorkout),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      }
      if (response.ok) {
        setError(null);
        setEmptyFields([]);
        onClose(); // Close the form after successful update
      }
    },
  });

  // Handler to prevent typing anything other than letters and spaces in the title input
  const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z\s]/g, "");
    formik.setFieldValue("title", sanitizedValue);
  };

  return (
    <form className="update-form" onSubmit={formik.handleSubmit}>
      <h3>Update Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={handleTitleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        name="title"
        className={formik.touched.title && formik.errors.title ? "border-red-500" : ""}
      />
      {formik.touched.title && formik.errors.title && (
        <div className="text-red-500">{formik.errors.title}</div>
      )}

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.load}
        name="load"
        className={formik.touched.load && formik.errors.load ? "border-red-500" : ""}
      />
      {formik.touched.load && formik.errors.load && (
        <div className="text-red-500">{formik.errors.load}</div>
      )}

      <label>Reps:</label>
      <input
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.reps}
        name="reps"
        className={formik.touched.reps && formik.errors.reps ? "border-red-500" : ""}
      />
      {formik.touched.reps && formik.errors.reps && (
        <div className="text-red-500">{formik.errors.reps}</div>
      )}

      <div className="buttons">
        <button
          className="btn btn-sm bg-green-400 hover:bg-green-500 text-white"
          type="submit"
        >
          Done
        </button>
        <button
          className="btn btn-sm bg-gray-400 hover:bg-gray-500 text-white"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutUpdateForm;
