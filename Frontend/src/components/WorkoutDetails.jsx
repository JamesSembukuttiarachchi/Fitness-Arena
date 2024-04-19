import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import axios from "axios";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import EditWorkout from "./EditWorkout.jsx";

const WorkoutDetails = ({ workout, onDeleteClick }) => {
  // Function to delete a user by id
  /*const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:6005/api/workouts/${userId}`);

      // Fetch the updated list of workouts after deletion
      const response = await axios.get("http://localhost:6005/api/workouts");
      dispatch({ type: "SET_WORKOUTS", payload: response.data });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };*/

  const handleDeleteClick = () => {
    onDeleteClick(workout._id);
  };

  return (
    <div className="workout-details flex justify-between items-center">
      <div>
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Number of reps: </strong>
          {workout.reps}
        </p>
        <p>{workout.createdAt}</p>
      </div>
      <div className="flex">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <FaPenToSquare/>
          <span className="hidden">Edit</span>
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          
            <EditWorkout workout={workout} />
          
        </dialog>
        <button
          className="btn bg-red-500 text-white font-bold hover:bg-red-600"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <FaRegTrashCan />
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Delete User?</h3>
            <p className="py-4">
              This action permanently removes the user's account and associated
              data.
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" onClick={handleDeleteClick}>
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default WorkoutDetails;
