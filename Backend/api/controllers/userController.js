import { User } from "../models/userModel.js";
import { workout } from "../models/workoutModels.js"; // Import the workout model
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);

    //create token
    const token = createToken(user._id);

    res.status(201).json({ email, role: user.role, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Register a new user
// Controller function to register a new user
// Register a new user
export const registerUser = async (req, res) => {
  const { fullName, username, email, role, password } = req.body;

  try {
    const user = await User.registerUser(
      fullName,
      username,
      email,
      role,
      password
    );

    //create token
    const token = createToken(user._id);

    res.status(201).json({ email, role: user.role, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Retrieve all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate({
        path: "biodata",
        populate: {
          path: "selectedWorkoutGoal",
          model: "WorkoutGoal", // Assuming the model name is 'WorkoutGoal'
        },
      })
      .populate("trainerApp")
      ;
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
    const user = await User.findById(id)
      .populate({
        path: "biodata",
        populate: {
          path: "selectedWorkoutGoal",
          model: "WorkoutGoal", // Assuming the model name is 'WorkoutGoal'
        },
      })
      .populate("trainerApp")
      ;
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

// Retrieve a single user by email
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email })
      .populate({
        path: "biodata",
        populate: {
          path: "selectedWorkoutGoal",
          model: "WorkoutGoal", // Assuming the model name is 'WorkoutGoal'
        },
      })
      .populate("trainerApp")
      ;
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

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { fullName, username, email, biodata, trainerApp, saveCard, password } =
    req.body;

  try {
    // Check which fields are present in req.body and update accordingly
    let updateFields = {};
    if (fullName) updateFields.fullName = fullName;
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (biodata) updateFields.biodata = biodata;
    if (trainerApp) updateFields.trainerApp = trainerApp;
    if (saveCard) updateFields.saveCard = saveCard;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      updateFields.password = hash;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

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
// Delete a user by ID
// Delete a user by ID
export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user to be deleted
    const deletedUser = await User.findById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete associated workouts
    await workout.deleteMany({ user: deletedUser._id });

    // Delete the user
    await User.deleteOne({ _id: deletedUser._id });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};
