import express from "express";
import {
  createCartItem,
  getMyCarts,
  getCartItemById,
  updateCartItemById,
  deleteCartItemById,
} from "../controllers/cartController.js";
//import { protect } from "../Middleware/requireAuth.js";

const router = express.Router();

//router.post("/", protect, createCartItem);
//router.get("/", protect, getMyCarts);
//router.get("/:id", protect, getCartItemById);
//router.put("/:id", protect, updateCartItemById);
//router.delete("/:id", protect, deleteCartItemById);

export default router;
