import mongoose from "mongoose";
import { WorkoutGoal } from "../models/wkGoalsModel.js";

// Function to create a new workout goal
async function createWorkoutGoal(req, res) {
  try {
    const { goal, description, photoURL } = req.body;
    const newWorkoutGoal = new WorkoutGoal({ goal, description, photoURL });
    const savedWorkoutGoal = await newWorkoutGoal.save();
    res.json(savedWorkoutGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to fetch all workout goals
async function getAllWorkoutGoals(req, res) {
  try {
    const workoutGoals = await WorkoutGoal.find();
    res.json(workoutGoals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to fetch a specific workout goal by ID
async function getWorkoutGoalById(req, res) {
  try {
    const workoutGoal = await WorkoutGoal.findById(req.params.id);
    if (workoutGoal == null) {
      return res.status(404).json({ message: "Workout goal not found" });
    }
    res.json(workoutGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to update a specific workout goal by ID
async function updateWorkoutGoalById(req, res) {
  try {
    const { goal, description, photoURL } = req.body;
    const updatedWorkoutGoal = await WorkoutGoal.findByIdAndUpdate(
      req.params.id,
      { goal, description, photoURL },
      { new: true }
    );
    res.json(updatedWorkoutGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to delete a specific workout goal by ID
async function deleteWorkoutGoalById(req, res) {
  try {
    await WorkoutGoal.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout goal deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  createWorkoutGoal,
  getAllWorkoutGoals,
  getWorkoutGoalById,
  updateWorkoutGoalById,
  deleteWorkoutGoalById,
};
