import express from "express";
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  updateDeliveryById,
  deleteDeliveryById,
} from "../controllers/deliveryController.js";

const router = express.Router();

// Create a new delivery
router.post("/", createDelivery);

// Get all deliveries
router.get("/", getAllDeliveries);

// Get a single delivery
router.get("/:id", getDeliveryById);

// Update a delivery
router.put("/:id", updateDeliveryById);

// Delete a delivery
router.delete("/:id", deleteDeliveryById);

export default router;
