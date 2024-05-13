import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} from "./paymentController.js";

const router = express.Router();

// Post a payment
router.post("/", createPayment);

// Get all payments
router.get("/", getAllPayments);

// Get payment by ID
router.get("/:id", getPaymentById);

// Update payment by ID
router.put("/:id", updatePaymentById);

// Delete payment by ID
router.delete("/:id", deletePaymentById);

export default router;
