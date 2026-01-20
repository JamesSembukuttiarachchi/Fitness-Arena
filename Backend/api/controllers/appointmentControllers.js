// controllers/appointmentControllers.js
import { appointment } from "../models/appointment.js";
import mongoose from "mongoose";

// ✅ Create appointment tied to logged-in user
export const createAppointment = async (req, res) => {
  try {
    const { firstname, lastname, trainername, email, phone, date, time } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !trainername || !email || !phone || !date || !time) {
      return res.status(400).json({ 
        message: "All fields are required",
        missing: Object.keys(req.body).filter(key => !req.body[key])
      });
    }

    // Validate user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User authentication required" });
    }

    const newAppointment = await appointment.create({
      firstname,
      lastname,
      trainername,
      email,
      phone,
      date,
      time,
      userId: req.user._id, // bind to logged-in user
    });

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Error creating appointment:", err.message);
    res.status(400).json({ 
      message: "Failed to create appointment", 
      error: err.message 
    });
  }
};

// ✅ Get all appointments for logged-in user
export const getAllAppointments = async (req, res) => {
  try {
    // Validate user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User authentication required" });
    }

    const appointments = await appointment.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching all appointments:", err.message);
    res.status(500).json({ 
      message: "Failed to fetch appointments", 
      error: err.message 
    });
  }
};

// ✅ Get a single appointment by ID (ownership enforced)
export const getAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid appointment ID format"
      });
    }

    // Validate user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User authentication required" });
    }

    // Find by ID and owner - IDOR protection
    const appointmentData = await appointment.findOne({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!appointmentData) {
      return res.status(404).json({
        message: "Appointment not found or access denied",
        hint: "This appointment either doesn't exist or doesn't belong to you"
      });
    }

    res.json(appointmentData);
  } catch (err) {
    console.error("Error fetching appointment by ID:", err.message);
    res.status(500).json({ 
      message: "Failed to fetch appointment", 
      error: err.message 
    });
  }
};

// ✅ Update appointment by ID (ownership enforced)
export const updateAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid appointment ID format"
      });
    }

    // Validate user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User authentication required" });
    }

    const updatedAppointment = await appointment.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // IDOR protection - ownership check
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        message: "Appointment not found or access denied",
        hint: "This appointment either doesn't exist or doesn't belong to you"
      });
    }

    res.json(updatedAppointment);
  } catch (err) {
    console.error("Error updating appointment:", err.message);
    res.status(400).json({ 
      message: "Failed to update appointment", 
      error: err.message 
    });
  }
};

// ✅ Delete appointment by ID (ownership enforced)
export const deleteAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid appointment ID format"
      });
    }

    // Validate user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User authentication required" });
    }

    const deletedAppointment = await appointment.findOneAndDelete({
      _id: id,
      userId: req.user._id, // IDOR protection - ownership check
    });

    if (!deletedAppointment) {
      return res.status(404).json({
        message: "Appointment not found or access denied",
        hint: "This appointment either doesn't exist or doesn't belong to you"
      });
    }

    res.json({ 
      message: "Appointment deleted successfully", 
      appointment: deletedAppointment 
    });
  } catch (err) {
    console.error("Error deleting appointment:", err.message);
    res.status(400).json({ 
      message: "Failed to delete appointment", 
      error: err.message 
    });
  }
};