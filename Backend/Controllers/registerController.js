import { Register } from "../Models/registerModel.js";
import mongoose from "mongoose";

// Register a new user
export const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Check if all required fields are present
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({
      message: "Please provide fullName, username, email, and password for registration.",
    });
  }

  try {
    const newUser = await Register.create({ fullName, username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
