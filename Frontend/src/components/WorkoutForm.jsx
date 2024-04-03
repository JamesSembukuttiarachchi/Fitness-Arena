import React, { useState } from "react";

const WorkoutForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:6005/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      onSubmit(json); // Call the onSubmit callback with the new workout data
      // Close the form
      setShowForm(false);
      // Refresh the page
      window.location.reload();
    }
  };

  return (
    <form
      action=""
      className="create p-4 border border-gray-300 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold mb-4">Add a New Workout</h3>

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

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Done
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
