import { workout } from "../Models/workoutModels.js";
import mongoose from "mongoose";

//create a workout
export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // Check if all required fields are present
  if (!title || !reps || !load) {
    return res.status(400).json({
      message: "Please provide title, reps, and load for the workout.",
    });
  }

  try {
    const newItem = await workout.create({ title, reps, load });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get all workouts
export const getWorkouts = async (req, res) => {
  //find all workouts sorting them in asc order
  const workouts = await workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// Get a single workout by ID
export const getWorkoutById = async (req, res) => {
  const { id } = req.params; 

  try {
    const foundWorkout = await workout.findById(id); 

    if (!foundWorkout) {
      return res.status(404).json({ message: 'Workout not found.' }); 
    }

    res.status(200).json(foundWorkout); 
  } catch (error) {
    console.error('Error retrieving workout:', error);
    res.status(500).json({ message: 'An error occurred while retrieving the workout.' }); 
  }
};

//Delete a workout by ID
export const deleteWorkoutById = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedWorkout = await workout.findByIdAndDelete(id); 

    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found.' }); 
    }

    res.status(200).json({ message: 'Workout deleted successfully.' }); 
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'An error occurred while deleting the workout.' }); 
  }
};

//update a workout
