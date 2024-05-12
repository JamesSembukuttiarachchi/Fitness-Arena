import mongoose from "mongoose";

// Define WorkoutGoal schema
const workoutGoalSchema = mongoose.Schema({
  // Workout goal name
  goal: {
    type: String,
    required: true,
  },
  // Description of the workout goal
  description: {
    type: String,
    required: true,
  },
  // URL for the workout goal photo
  photoURL: {
    type: String,
    required: true,
  },
});

// Create WorkoutGoal model
export const WorkoutGoal = mongoose.model("WorkoutGoal", workoutGoalSchema);
