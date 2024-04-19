import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const EditWorkout = ({ workout }) => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTitle(workout.title);
    setLoad(workout.load);
    setReps(workout.reps);
  }, [workout]);

  const updateData = (e) => {
    e.preventDefault();

    const workData = {
      title,
      load,
      reps,
    };

    axios
      .put(`http://localhost:6005/api/workouts/${workout._id}`, workData)
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

      <label className="block mb-2">Exercise Title:</label>
      <input
        type="text"
        className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label className="block mb-2">Load (kg):</label>
      <input
        type="number"
        className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label className="block mb-2">Reps:</label>
      <input
        type="number"
        className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={updateData} className="btn bg-orange-500 hover:bg-orange-600 text-white uppercase">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditWorkout;
