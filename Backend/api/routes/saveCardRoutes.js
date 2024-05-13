import express from "express";
import {
  createCard,
  getAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
} from "../controllers/saveCardController.js";

const router = express.Router();

// Post a card
router.post("/", createCard);

// Get all cards
router.get("/", getAllCards);

// Get card by ID
router.get("/:id", getCardById);

// Update card by ID
router.put("/:id", updateCardById);

// Delete card by ID
router.delete("/:id", deleteCardById);

export default router;
