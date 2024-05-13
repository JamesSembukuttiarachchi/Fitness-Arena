import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FitnessGoal = () => {
  const [workoutGoals, setWorkoutGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Define a function to fetch workout Goals
    const fetchWorkoutGoals = async () => {
      try {
        // Make a GET request using Axios
        const response = await axios.get("http://localhost:6005/workoutGoals/");
        // Assuming the response contains workout Goals data
        setWorkoutGoals(response.data);
      } catch (error) {
        console.error("Error fetching workout Goals:", error);
      }
    };

    // Call the fetchWorkoutGoals function
    fetchWorkoutGoals();
  }, []); // Empty dependency array ensures the effect runs only once

  // Function to handle card selection
  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
  };

  // Function to handle button click
  const handleNextButtonClick = async () => {
    if (selectedGoal) {
      try {
        // Send PUT request to update biodata with selected goal's ID

        await axios.put(`http://localhost:6005/biodata/${id}`, {
          selectedWorkoutGoal: selectedGoal,
        });
        // Navigate to biodata component with selected workout goal ID
        navigate(`/select/confirm/${id}`);
      } catch (error) {
        console.error("Error updating biodata:", error);
      }
    } else {
      console.error("No goal selected!");
    }
  };
  return (
    <div className="flex flex-col items-center m-4 gap-8">
      <div>
        <ul className="steps">
          <li className="step"></li>
          <li className="step step-primary"></li>
          <li className="step"></li>
        </ul>
      </div>
      {workoutGoals.map((goal, index) => (
        <div
          key={index}
          className={`card card-side bg-base-300 shadow-xl max-w-screen-lg ${
            selectedGoal === goal ? "bg-primary" : ""
          }`}
          onClick={() => handleGoalSelection(goal)}
        >
          {/* Adjusted width */}
          <div className="card-body max-w-7xl">
            <h2 className="card-title">{goal.goal}</h2>
            <p className="font-medium">{goal.description}</p>
          </div>
          <figure className="self-center w-1/4">
            <img src={goal.photoURL} alt="Movie" />
          </figure>
        </div>
      ))}

      <button className="btn btn-orange-600" onClick={handleNextButtonClick}>
        Next
      </button>
    </div>
  );
};

export default FitnessGoal;
