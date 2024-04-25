import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WorkoutUpdateForm from "./WorkoutUpdateForm"; // Import the WorkoutForm component for update
import { useSnackbar } from "notistack"; // Import useSnackbar hook from Notistack

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar hook

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirmed) return;

    const response = await fetch(
      "http://localhost:6005/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      enqueueSnackbar("Workout deleted successfully!", { variant: "success" }); // Display success message
    } else {
      enqueueSnackbar("Failed to delete workout!", { variant: "error" }); // Display error message
    }
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span>
        <button
          className="btn btn-sm bg-red-400 hover:bg-red-600 text-white uppercase"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        <button
          className="btn btn-sm bg-orange-400 hover:bg-orange-600 text-white uppercase"
          onClick={handleUpdateClick}
        >
          Update
        </button>
      </span>
      {showUpdateForm && (
        <div className="update-form">
          <WorkoutUpdateForm
            workout={workout}
            onClose={handleCloseUpdateForm}
          />
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
