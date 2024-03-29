import mongoose from "mongoose";

// Define BloodType enum
const BloodType = Object.freeze({
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
});

// Define User schema
const userSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodType: {
    type: String,
    enum: Object.values(BloodType),
    required: true,
  },
  selectedWorkoutGoal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkoutGoal",
    required: true,
  },
});

// Create User model
const User = mongoose.model("userBioData", userSchema);

// Export the User model and BloodType enum
export { User, BloodType };
