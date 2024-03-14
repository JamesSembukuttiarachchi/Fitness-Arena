import { workout } from "../Models/workoutModels.js";
import mongoose from "mongoose";

//create a workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //add document to database
  try {
    const workout = await workout.create({ title, load, reps });
    res.status(200).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all workouts
export const getWorkouts = async (req, res) => {
  //find all workouts sorting them in asc order
  const workouts = await workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//get a single workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not found" });
  }
  //find the workout by id
  const workout = await workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "not found" });
  }

  res.status(200).json(workout);
};

//delete a workout

//update a workout
