import express from "express";
import {
  createCard,
  getAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
} from "../controllers/cardController.js";

const router = express.Router();

// POST - Create a new card
router.post("/", createCard);

// GET - Retrieve all cards
router.get("/", getAllCards);

// GET - Retrieve a single card by ID
router.get("/:id", getCardById);

// PUT - Update a card by ID
router.put("/:id", updateCardById);

// DELETE - Delete a card by ID
router.delete("/:id", deleteCardById);

export default router;
