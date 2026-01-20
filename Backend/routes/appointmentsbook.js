// controllers/appointmentController.js

import { appointment } from "../models/appointment.js";

// Controller function to add a single appointment
export const createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointment = await appointment.create(appointmentData);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to retrieve all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to retrieve a single appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const appointmentData = await appointment.findById(id);
    if (!appointmentData) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(appointmentData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to update an appointment by ID
export const updateAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAppointment = await appointment.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to delete an appointment by ID
export const deleteAppointmentById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAppointment = await appointment.findByIdAndDelete(id);
    res.json(deletedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
