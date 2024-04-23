import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FitnessGoal = () => {
  const [workoutGoals, setWorkoutGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();

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
  const handleNextButtonClick = () => {
    if (selectedGoal) {
      // Navigate to another page with the selected goal
      navigate(`/biodata/${selectedGoal._id}`);
    } else {
      // Handle case where no goal is selected
      console.error("No goal selected!");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center m-4 gap-4">
        <div>
          <ul className="steps">
            <li className="step step-primary"></li>
            <li className="step"></li>
            <li className="step"></li>
            <li className="step"></li>
          </ul>
        </div>
        {workoutGoals.map((goal, index) => (
          <div
            key={index}
            className={`card card-side bg-base-300 shadow-xl max-w-screen-lg ${selectedGoal === goal ? 'bg-primary' : ''}`}
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

        <button className="btn" onClick={handleNextButtonClick}>Next</button>
      </div>
    </div>
  );
};

export default FitnessGoal;
