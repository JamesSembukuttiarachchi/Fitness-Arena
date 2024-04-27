import express from "express";
import {
  createWorkout,
  getWorkoutById,
  getWorkouts,
  deleteWorkoutById,
  updateWorkoutById,
} from "../Controllers/workoutController.js";

import requireAuth from "../Middleware/requireAuth.js";

//require auth for all workout routes
const router = express.Router();

router.use(requireAuth)

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
