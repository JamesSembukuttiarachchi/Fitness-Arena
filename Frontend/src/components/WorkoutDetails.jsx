import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleDeleteClick = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEditClick = () => {
    // Implement edit functionality here
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
        <button
          onClick={handleEditClick}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-2 rounded focus:outline-none text-sm mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteClick}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-2 rounded focus:outline-none text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetails;
