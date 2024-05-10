import mongoose from "mongoose";

// Define a Mongoose schema
const PhysioAppointmentSchema = new mongoose.Schema({
  physioName: {
    type: String,
    default: "Alan",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  selectedDate: {
    type: String,
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
  selectedPkg: {
    type: String,
    enum: [
      "Stretching",
      "Massage",
      "Physiotherapy",
      "Exercise Prescription",
      "Pain Management",
      "Other",
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model
export const PhysioAppointment = mongoose.model(
  "PhysioAppointment",
  PhysioAppointmentSchema
);
