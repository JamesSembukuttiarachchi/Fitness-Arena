import express from "express";
import {
  createWorkout,
  getWorkoutById,
  getWorkouts,
  deleteWorkoutById,
  updateWorkoutById,
} from "../Controllers/workoutController.js";

const router = express.Router();

//POST a new workout
router.post("/", createWorkout);

//GET all workouts
router.get("/", getWorkouts);

//GEt a single workout
router.get("/:id", getWorkoutById);

//DELETE a new workout
router.delete("/:id", deleteWorkoutById);

//UPDATE workout
router.put("/:id", updateWorkoutById);

export default router;
