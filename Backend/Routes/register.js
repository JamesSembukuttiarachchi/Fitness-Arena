import express from "express";
import { registerUser } from "../Controllers/registerController.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

export default router;
