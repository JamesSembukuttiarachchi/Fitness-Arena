// routes/trainerRoutes.js

import express from "express";
import {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainerById,
  deleteTrainerById,
} from "../controllers/trainerControllers.js";

const router = express.Router();

// Routes
router.post('/', createTrainer);
router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.put('/:id', updateTrainerById);
router.delete('/:id', deleteTrainerById);

export default router;
