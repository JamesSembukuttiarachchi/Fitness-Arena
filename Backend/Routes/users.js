import express from "express";
import { getUsers, getUserById, updateUserById, deleteUserById } from "../Controllers/userController.js";

const router = express.Router();

// Retrieve all users
router.get("/", getUsers);

// Retrieve a single user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.put("/:id", updateUserById);

// Delete a user by ID
router.delete("/:id", deleteUserById);

export default router;
