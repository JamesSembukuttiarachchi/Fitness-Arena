import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById
} from "../Controllers/userController.js";

const router = express.Router();

//login
router.post("/login", loginUser)

// Create a new user
router.post("/register", registerUser);

// Retrieve a single user by email
router.get("/:email", getUserByEmail);

// Retrieve all users
router.get("/", getUsers);

// Retrieve a single user by ID
router.get("/:id", getUserById);

// Update a user by ID
router.put("/:id", updateUserById);

// Delete a user by ID
router.delete("/:id", deleteUserById);

export default router;
