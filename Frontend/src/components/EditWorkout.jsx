import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditWorkout = ({ workout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTitle(workout.title);
    setLoad(workout.load);
    setReps(workout.reps);
  }, [workout]);

  const updateData = (values) => {
    axios
      .put(`http://localhost:6005/api/workouts/${workout._id}`, values)
      .then((response) => {
        console.log("Workout updated successfully:", response.data);
        alert("Successfully Updated");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Failed to edit workout data:", error);
        alert("Failed to edit workout data. Error: " + error.message);
      });
  };

  return (
    <div className="modal-box bg-white">
      <h3 className="text-lg font-semibold mb-4">Edit Workout</h3>

      <Formik
        initialValues={{
          title: workout.title || "",
          load: workout.load || "",
          reps: workout.reps || "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          load: Yup.number()
            .required("Load is required")
            .positive("Load must be positive")
            .integer("Load must be an integer"),
          reps: Yup.number()
            .required("Reps is required")
            .positive("Reps must be positive")
            .integer("Reps must be an integer"),
        })}
        onSubmit={(values) => {
          updateData(values);
        }}
      >
        <Form>
          <label className="block mb-2">Exercise Title:</label>
          <Field
            type="text"
            name="title"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
          />
          <ErrorMessage name="title" component="div" className="text-red-500" />

          <label className="block mb-2">Load (kg):</label>
          <Field
            type="number"
            name="load"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
          />
          <ErrorMessage name="load" component="div" className="text-red-500" />

          <label className="block mb-2">Reps:</label>
          <Field
            type="number"
            name="reps"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
          />
          <ErrorMessage name="reps" component="div" className="text-red-500" />

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-sm bg-orange-400 hover:bg-orange-600 text-white uppercase"
            >
              update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditWorkout;
