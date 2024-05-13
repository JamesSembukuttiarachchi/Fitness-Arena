import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // You may want to add additional validation for email format
  },
  membershipId: {
    type: String,
    default: null, // Assuming membership ID is optional
  },
  topic: {
    type: String,
    enum: [
      "registrations",
      "workout schedules",
      "shopping",
      "appointments",
      "other",
    ],
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date and time
  },
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
