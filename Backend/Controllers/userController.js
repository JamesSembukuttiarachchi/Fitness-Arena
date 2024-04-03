import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);

    //create token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  try {
    const user = await User.registerUser(fullName, username, email, password);

    //create token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Retrieve all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving users." });
  }
};

// Retrieve a single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the user." });
  }
};

// Update a user by ID
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { fullName, username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName, username, email, password: hash },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

// Delete a user by ID
export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};
