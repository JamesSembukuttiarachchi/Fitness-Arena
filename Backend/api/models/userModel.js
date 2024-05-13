import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { workout } from './workoutModels.js'; // Import the workout model

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "pkgManager", "pmtManager"], // Define roles, you can extend this as needed
      default: "user", // Default role is user
    },
    biodata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userBioData",
    },
    trainerApp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment"
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to delete associated workouts when a user is deleted
userSchema.pre('remove', async function(next) {
  try {
    // Delete all workouts associated with this user
    await workout.deleteMany({ user: this._id });
    next();
  } catch (error) {
    next(error);
  }
});


//static register method
userSchema.statics.registerUser = async function (fullName, username, email, role, password) {
  // Validation
  if (!fullName || !username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ fullName, username, email, role, password: hash });

  return user;
};

//static login method
userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid login credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid login credentials");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);
