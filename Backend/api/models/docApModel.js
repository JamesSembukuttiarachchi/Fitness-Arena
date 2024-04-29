import mongoose from "mongoose";

// Define a Mongoose schema
const DocAppointmentSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    default: "George",
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
  
  message: {
    type: String,
    required: true,
  }
});

// Create a Mongoose model
export const DocAppointment = mongoose.model(
  "DocAppointment",
  DocAppointmentSchema
);
