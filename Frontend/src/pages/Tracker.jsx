import { useEffect, useState } from "react";
import axios from "axios";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Tracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
    toggleForm(); // Close the form after submission
  };

  const fetchWorkouts = () => {
    axios
      .get("http://localhost:6005/api/workouts")
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteClick = (workoutId) => {
    axios
      .delete(`http://localhost:6005/api/workouts/${workoutId}`)
      .then(() => {
        setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
      })
      .catch((error) => {
        console.error("Error deleting workout:", error);
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="Tracker">
      {/*Workouts*/}
      <div className="flex">
        <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto">
          {workouts &&
            workouts.map((workout) => (
              <div key={workout._id} className="mb-8">
                <WorkoutDetails
                  workout={workout}
                  onDeleteClick={handleDeleteClick}
                />
              </div>
            ))}
        </div>
        <div>
          <button
            onClick={toggleForm}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Workout
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
            <div className="bg-white p-8 rounded-lg shadow-md z-10">
              <button
                onClick={toggleForm}
                className="absolute top-0 right-0 m-4"
              >
                &times;
              </button>
              <WorkoutForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracker;
