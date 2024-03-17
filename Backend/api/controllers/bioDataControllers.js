import { User } from "../models/bioDataModel.js";

// Function to create a new user's biographic data
async function createBiographicData(req, res) {
  try {
    const { weight, height, age, bloodType, selectedWorkoutGoal } = req.body;
    const newUser = new User({
      weight,
      height,
      age,
      bloodType,
      selectedWorkoutGoal,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to get all users' biographic data
async function getAllBiographicData(req, res) {
  try {
    const users = await User.find();
    res.json(
      users.map((user) => ({
        _id: user._id,
        weight: user.weight,
        height: user.height,
        age: user.age,
        bloodType: user.bloodType,
        selectedWorkoutGoal: user.selectedWorkoutGoal,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to get a specific user's biographic data by ID
async function getBiographicDataById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      _id: user._id,
      weight: user.weight,
      height: user.height,
      age: user.age,
      bloodType: user.bloodType,
      selectedWorkoutGoal: user.selectedWorkoutGoal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to update a specific user's biographic data by ID
async function updateBiographicDataById(req, res) {
  try {
    const { weight, height, age, bloodType, selectedWorkoutGoal } = req.body;
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { weight, height, age, bloodType, selectedWorkoutGoal },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Function to delete a specific user's biographic data by ID
async function deleteBiographicDataById(req, res) {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "Biographic data deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  createBiographicData,
  getAllBiographicData,
  getBiographicDataById,
  updateBiographicDataById,
  deleteBiographicDataById,
};
