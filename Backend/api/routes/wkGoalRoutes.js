import express from "express";
import {
  createWorkoutGoal,
  getAllWorkoutGoals,
  getWorkoutGoalById,
  updateWorkoutGoalById,
  deleteWorkoutGoalById,
} from "../controllers/wkGoalsController.js";

const router = express.Router();

// POST route to create a new workout goal
router.post("/", createWorkoutGoal);

// GET route to fetch all workout goals
router.get("/", getAllWorkoutGoals);

// GET route to fetch a specific workout goal by ID
router.get("/:id", getWorkoutGoalById);

// PUT route to update a specific workout goal by ID
router.put("/:id", updateWorkoutGoalById);

// DELETE route to delete a specific workout goal by ID
router.delete("/:id", deleteWorkoutGoalById);

export default router
