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

  useEffect(() => {
    axios
      .get("http://localhost:6005/api/workouts")
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Tracker">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <button onClick={toggleForm} className="fixed bottom-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Workout
      </button>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-8 rounded-lg shadow-md z-10">
            <button onClick={toggleForm} className="absolute top-0 right-0 m-4">&times;</button>
            <WorkoutForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
