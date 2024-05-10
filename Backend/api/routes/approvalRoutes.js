import express from "express";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscriptionById,
  deleteSubscriptionById,
} from "../controllers/approvalControllers.js";

const router = express.Router();

// POST - Create a new subscription
router.post("/", createSubscription);

// GET - Retrieve all subscriptions
router.get("/", getAllSubscriptions);

// GET - Retrieve a specific subscription by ID
router.get("/:id", getSubscriptionById);

// PUT - Update a subscription by ID
router.put("/:id", updateSubscriptionById);

// DELETE - Delete a subscription by ID
router.delete("/:id", deleteSubscriptionById);

export default router;
