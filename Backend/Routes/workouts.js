import express from "express";
import {
  createWorkout,
  getWorkout,
  getWorkouts,
} from "../Controllers/workoutController.js";

const router = express.Router();

//POST a new workout
router.post("/", createWorkout);

//GET all workouts
router.get("/", getWorkouts);

//GEt a single workout
router.get("/:id", getWorkout);

//DELETE a new workout
router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE workout" });
});

//UPDATE a new workout
router.patch("/:id", (req, res) => {
  res.json({ msg: "UPDATE workout" });
});

export default router;
